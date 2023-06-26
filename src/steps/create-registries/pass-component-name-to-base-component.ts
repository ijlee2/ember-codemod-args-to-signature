import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/files.js';

type Options = {
  baseComponentName: string;
  data: {
    entity: TransformedEntityName;
  };
};

export function passComponentNameToBaseComponent(
  file: string,
  options: Options,
): {
  componentName: string;
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { baseComponentName, data } = options;
  let componentName!: string;

  const ast = traverse(file, {
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

  return {
    componentName,
    newFile: AST.print(ast),
  };
}
