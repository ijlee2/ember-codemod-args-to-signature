/* eslint-disable @typescript-eslint/ban-ts-comment */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { createFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import {
  getComponentFilePath,
  type TransformedEntityName,
  transformEntityName,
} from '../utils/files.js';
import {
  getBaseComponentName,
  hasRegistry,
  passComponentNameToBaseComponent,
} from './create-registries/index.js';

type Data = {
  entity: TransformedEntityName;
};

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
  const baseComponentName = getBaseComponentName(file);

  if (baseComponentName === undefined) {
    return file;
  }

  const { componentName, newFile } = passComponentNameToBaseComponent(file, {
    baseComponentName,
    data,
  });

  const traverse = AST.traverse(true);

  const ast = traverse(newFile, {
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
    const hasBackingClass = extensions.has('.ts');

    if (!hasBackingClass) {
      continue;
    }

    const filePath = getComponentFilePath(options)(entityName);

    const data = {
      entity: transformEntityName(entityName),
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (hasRegistry(file)) {
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
