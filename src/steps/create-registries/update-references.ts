import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/files.js';

type Options = {
  baseComponentName: string;
  componentName: string;
  data: {
    entity: TransformedEntityName;
  };
};

export function updateReferences(
  file: string,
  options: Options,
): {
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { baseComponentName, componentName, data } = options;

  const ast = traverse(file, {
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

  return {
    newFile: AST.print(ast),
  };
}
