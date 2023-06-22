/* eslint-disable @typescript-eslint/ban-ts-comment */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { classify, doubleColonize } from '@codemod-utils/ember-cli-string';
import { createFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getComponentFilePath } from '../utils/files.js';

type Data = {
  entity: {
    classifiedName: string;
    doubleColonizedName: string;
    name: string;
  };
};

function cannotCreateRegistry(file: string): boolean {
  const traverse = AST.traverse(true);

  let hasRegistry = false;
  let isClassicComponent = false;
  let isComponent = false;

  traverse(file, {
    visitImportDeclaration(path) {
      const importPath = path.node.source.value;

      switch (importPath) {
        case '@ember/component': {
          isClassicComponent = true;
          isComponent = true;

          break;
        }

        case '@ember/component/template-only':
        case '@glimmer/component': {
          isComponent = true;

          break;
        }
      }

      return false;
    },

    visitTSModuleDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      const moduleName = path.node.id.value;

      if (moduleName === '@glint/environment-ember-loose/registry') {
        hasRegistry = true;
      }

      return false;
    },
  });

  if (!isComponent) {
    return true;
  }

  return hasRegistry || isClassicComponent;
}

function createRegistry(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  const ast = traverse(file);

  // @ts-ignore: Assume that types from external packages are correct
  const nodes = ast.program.body;

  const registryEntries = AST.builders.tsInterfaceBody([
    AST.builders.tsPropertySignature(
      AST.builders.stringLiteral(data.entity.doubleColonizedName),
      AST.builders.tsTypeAnnotation(
        AST.builders.tsTypeQuery(
          AST.builders.identifier(`${data.entity.classifiedName}Component`),
        ),
      ),
    ),
    AST.builders.tsPropertySignature(
      AST.builders.stringLiteral(data.entity.name),
      AST.builders.tsTypeAnnotation(
        AST.builders.tsTypeQuery(
          AST.builders.identifier(`${data.entity.classifiedName}Component`),
        ),
      ),
    ),
  ]);

  const registryNode = AST.builders.tsModuleDeclaration(
    AST.builders.stringLiteral('@glint/environment-ember-loose/registry'),
    AST.builders.tsModuleBlock([
      AST.builders.exportDefaultDeclaration(
        AST.builders.tsInterfaceDeclaration(
          AST.builders.identifier('Registry'),
          registryEntries,
        ),
      ),
    ]),
  );

  registryNode.declare = true;

  nodes.push(registryNode);

  return AST.print(ast);
}

function renameComponent(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;

  let ast = traverse(file, {
    visitImportDeclaration(path) {
      const importPath = path.node.source.value;

      switch (importPath) {
        case '@ember/component/template-only':
        case '@glimmer/component': {
          // @ts-ignore: Assume that types from external packages are correct
          baseComponentName = path.node.specifiers[0]!.local.name;

          return false;
        }
      }

      return false;
    },
  });

  let newFile = AST.print(ast);

  if (baseComponentName === undefined) {
    return newFile;
  }

  let componentName: string | undefined;

  ast = traverse(newFile, {
    visitClassDeclaration(path) {
      if (!path.node.superClass) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.superClass.name !== baseComponentName) {
        return false;
      }

      if (!path.node.id) {
        path.node.id = AST.builders.identifier(
          `${data.entity.classifiedName}Component`,
        );

        return false;
      }

      componentName = path.node.id.name as string;
      path.node.id.name = `${data.entity.classifiedName}Component`;

      return false;
    },

    visitVariableDeclaration(path) {
      const declaration = path.node.declarations[0]!;

      // @ts-ignore: Assume that types from external packages are correct
      switch (declaration.init.type) {
        case 'CallExpression': {
          // @ts-ignore: Assume that types from external packages are correct
          if (declaration.init.callee.type !== 'Identifier') {
            return false;
          }

          // @ts-ignore: Assume that types from external packages are correct
          if (declaration.init.callee.name !== baseComponentName) {
            return false;
          }

          // @ts-ignore: Assume that types from external packages are correct
          componentName = declaration.id.name;
          // @ts-ignore: Assume that types from external packages are correct
          declaration.id.name = `${data.entity.classifiedName}Component`;

          return false;
        }

        case 'ClassExpression': {
          // @ts-ignore: Assume that types from external packages are correct
          if (!declaration.init.superClass) {
            return false;
          }

          // @ts-ignore: Assume that types from external packages are correct
          if (declaration.init.superClass.name !== baseComponentName) {
            return false;
          }

          // @ts-ignore: Assume that types from external packages are correct
          componentName = declaration.id.name;
          // @ts-ignore: Assume that types from external packages are correct
          declaration.id.name = `${data.entity.classifiedName}Component`;

          return false;
        }
      }

      return false;
    },
  });

  newFile = AST.print(ast);

  ast = traverse(newFile, {
    visitExportDefaultDeclaration(path) {
      switch (path.node.declaration.type) {
        case 'CallExpression': {
          // @ts-ignore: Assume that types from external packages are correct
          if (path.node.declaration.callee.name !== baseComponentName) {
            return false;
          }

          const nodesToAdd = [
            AST.builders.noop(),
            AST.builders.exportDefaultDeclaration(
              AST.builders.identifier(`${data.entity.classifiedName}Component`),
            ),
          ];

          path.parentPath.value.push(...nodesToAdd);

          return AST.builders.variableDeclaration('const', [
            AST.builders.variableDeclarator(
              AST.builders.identifier(`${data.entity.classifiedName}Component`),
              path.node.declaration,
            ),
          ]);
        }

        case 'Identifier': {
          if (path.node.declaration.name !== componentName) {
            return false;
          }

          path.node.declaration.name = `${data.entity.classifiedName}Component`;

          return false;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}

export function createRegistries(context: Context, options: Options): void {
  const { projectRoot } = options;

  const fileMap = new Map<string, string>();

  for (const [entityName, extensions] of context.entities) {
    const isTypeScript = extensions.has('.ts');

    if (!isTypeScript) {
      continue;
    }

    const filePath = getComponentFilePath(options)(entityName);

    const data = {
      entity: {
        classifiedName: classify(entityName),
        doubleColonizedName: doubleColonize(entityName),
        name: entityName,
      },
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (cannotCreateRegistry(file)) {
        continue;
      }

      file = renameComponent(file, data);
      file = createRegistry(file, data);

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createRegistries could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  createFiles(fileMap, options);
}
