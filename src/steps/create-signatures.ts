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

function cannotCreateSignature(file: string): boolean {
  const traverse = AST.traverse(true);

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
  });

  if (!isComponent) {
    return true;
  }

  return isClassicComponent;
}

function getKeys(nodes: unknown): Set<string> {
  type Node = { key: { name: string } };

  return new Set((nodes as Node[]).map(({ key }) => key.name));
}

function isSignature(keys: Set<string>): boolean {
  return keys.has('Args') || keys.has('Blocks') || keys.has('Element');
}

function convertArgsToSignature({
  b,
  nodes,
}: {
  b: (typeof AST)['builders'];
  nodes: unknown;
}) {
  return [
    b.tsPropertySignature(
      b.identifier('Args'),
      // @ts-ignore: Assume that types from external packages are correct
      b.tsTypeAnnotation(b.tsTypeLiteral(nodes)),
      false,
    ),

    b.tsPropertySignature(
      b.identifier('Blocks'),
      b.tsTypeAnnotation(
        b.tsTypeLiteral([
          b.tsPropertySignature(
            b.identifier('default'),
            b.tsTypeAnnotation(b.tsTupleType([])),
          ),
        ]),
      ),
      false,
    ),

    b.tsPropertySignature(
      b.identifier('Element'),
      b.tsTypeAnnotation(b.tsNullKeyword()),
      false,
    ),
  ];
}

function createSignature(file: string, data: Data): string {
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

  let interfaceName: string | undefined;

  ast = traverse(newFile, {
    visitCallExpression(path) {
      // @ts-ignore: Assume that types from external packages are correct
      const calleeName = path.node.callee.name;

      if (calleeName !== baseComponentName) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      const typeParameters = path.node.typeParameters;

      // When the interface is missing
      if (!typeParameters) {
        if (path.parentPath.node.type !== 'VariableDeclaration') {
          return false;
        }

        const index = path.parentPath.parentPath.parentPath.name;

        path.parentPath.parentPath.parentPath.parentPath.value.splice(
          index,
          0,
          AST.builders.tsInterfaceDeclaration(
            AST.builders.identifier(`${data.entity.classifiedName}Signature`),
            AST.builders.tsInterfaceBody(
              convertArgsToSignature({
                b: AST.builders,
                nodes: [],
              }),
            ),
          ),
        );

        // @ts-ignore: Assume that types from external packages are correct
        path.node.typeParameters = AST.builders.tsTypeParameterInstantiation([
          AST.builders.tsTypeReference(
            AST.builders.identifier(`${data.entity.classifiedName}Signature`),
          ),
        ]);

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          const keys = getKeys(typeParameter.members);

          if (isSignature(keys)) {
            break;
          }

          const index = path.parentPath.parentPath.parentPath.name;

          path.parentPath.parentPath.parentPath.parentPath.value.splice(
            index,
            0,
            AST.builders.tsInterfaceDeclaration(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
              AST.builders.tsInterfaceBody(
                convertArgsToSignature({
                  b: AST.builders,
                  nodes: typeParameter.members,
                }),
              ),
            ),
          );

          // @ts-ignore: Assume that types from external packages are correct
          path.node.typeParameters.params = [
            AST.builders.tsTypeReference(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
            ),
          ];

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          interfaceName = typeParameter.typeName.name;
          typeParameter.typeName.name = `${data.entity.classifiedName}Signature`;

          return false;
        }
      }

      return false;
    },

    visitClassDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.superClass.name !== baseComponentName) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      // When the interface is missing
      if (!typeParameters) {
        if (path.parentPath.node.type !== 'ExportDefaultDeclaration') {
          return false;
        }

        const index = path.parentPath.name;

        path.parentPath.parentPath.value.splice(
          index,
          0,
          AST.builders.tsInterfaceDeclaration(
            AST.builders.identifier(`${data.entity.classifiedName}Signature`),
            AST.builders.tsInterfaceBody(
              convertArgsToSignature({
                b: AST.builders,
                nodes: [],
              }),
            ),
          ),
        );

        path.node.superTypeParameters =
          AST.builders.tsTypeParameterInstantiation([
            AST.builders.tsTypeReference(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
            ),
          ]);

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          const keys = getKeys(typeParameter.members);

          if (isSignature(keys)) {
            break;
          }

          const index = path.parentPath.name;

          path.parentPath.parentPath.value.splice(
            index,
            0,
            AST.builders.tsInterfaceDeclaration(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
              AST.builders.tsInterfaceBody(
                convertArgsToSignature({
                  b: AST.builders,
                  nodes: typeParameter.members,
                }),
              ),
            ),
          );

          // @ts-ignore: Assume that types from external packages are correct
          path.node.superTypeParameters.params = [
            AST.builders.tsTypeReference(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
            ),
          ];

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          // @ts-ignore: Assume that types from external packages are correct
          interfaceName = typeParameter.typeName.name;
          // @ts-ignore: Assume that types from external packages are correct
          typeParameter.typeName.name = `${data.entity.classifiedName}Signature`;

          return false;
        }
      }

      return false;
    },
  });

  newFile = AST.print(ast);

  if (interfaceName === undefined) {
    return newFile;
  }

  ast = traverse(newFile, {
    visitTSInterfaceDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      path.node.id.name = `${data.entity.classifiedName}Signature`;

      const typeParameter = path.node.body;
      const keys = getKeys(typeParameter.body);

      if (isSignature(keys)) {
        return false;
      }

      typeParameter.body = convertArgsToSignature({
        b: AST.builders,
        nodes: typeParameter.body,
      });

      return false;
    },

    visitTSTypeAliasDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      path.node.id.name = `${data.entity.classifiedName}Signature`;

      const typeParameter = path.node.typeAnnotation;
      // @ts-ignore: Assume that types from external packages are correct
      const keys = getKeys(typeParameter.members);

      if (isSignature(keys)) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      typeParameter.members = convertArgsToSignature({
        b: AST.builders,
        // @ts-ignore: Assume that types from external packages are correct
        nodes: typeParameter.members,
      });

      return false;
    },

    visitTSTypeReference(path) {
      if (path.node.typeName.type !== 'Identifier') {
        return false;
      }

      if (path.node.typeName.name !== interfaceName) {
        return false;
      }

      if (path.node.typeName.name.endsWith('Signature')) {
        return false;
      }

      path.node.typeName.name = `${data.entity.classifiedName}Signature['Args']`;

      return false;
    },
  });

  return AST.print(ast);
}

export function createSignatures(context: Context, options: Options): void {
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

      if (cannotCreateSignature(file)) {
        continue;
      }

      file = createSignature(file, data);

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createSignatures could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  createFiles(fileMap, options);
}
