import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/components.js';
import { builderAddSignature, builderPassSignature } from './builders.js';
import { isSignature } from './is-signature.js';

type Options = {
  baseComponentName: string;
  data: {
    entity: TransformedEntityName;
  };
};

export function passSignatureToBaseComponent(
  file: string,
  options: Options,
): {
  interfaceName: string | undefined;
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { baseComponentName, data } = options;
  let interfaceName: string | undefined;

  const ast = traverse(file, {
    visitCallExpression(path) {
      if (
        path.node.callee.type !== 'Identifier' ||
        path.node.callee.name !== baseComponentName
      ) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      const typeParameters = path.node.typeParameters;

      // When the interface is missing
      if (!typeParameters) {
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.classifiedName}Signature`;
            const index = path.parentPath.name;

            path.parentPath.parentPath.value.splice(
              index,
              0,
              builderAddSignature(identifier),
            );

            // @ts-ignore: Assume that types from external packages are correct
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }

          case 'VariableDeclarator': {
            const identifier = `${data.entity.classifiedName}Signature`;
            const index = path.parentPath.parentPath.parentPath.name;

            path.parentPath.parentPath.parentPath.parentPath.value.splice(
              index,
              0,
              builderAddSignature(identifier),
            );

            // @ts-ignore: Assume that types from external packages are correct
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          if (isSignature(typeParameter.members)) {
            break;
          }

          const identifier = `${data.entity.classifiedName}Signature`;
          const index = path.parentPath.parentPath.parentPath.name;

          path.parentPath.parentPath.parentPath.parentPath.value.splice(
            index,
            0,
            builderAddSignature(identifier, typeParameter.members),
          );

          // @ts-ignore: Assume that types from external packages are correct
          path.node.typeParameters = builderPassSignature(identifier);

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
      if (
        !path.node.superClass ||
        path.node.superClass.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      // When the interface is missing
      if (!typeParameters) {
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.classifiedName}Signature`;
            const index = path.parentPath.name;

            path.parentPath.parentPath.value.splice(
              index,
              0,
              builderAddSignature(identifier),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }

          case 'Program': {
            const identifier = `${data.entity.classifiedName}Signature`;
            const index = path.name;

            path.parentPath.value.splice(
              index,
              0,
              builderAddSignature(identifier),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          if (isSignature(typeParameter.members)) {
            break;
          }

          const identifier = `${data.entity.classifiedName}Signature`;
          const index = path.parentPath.name;

          path.parentPath.parentPath.value.splice(
            index,
            0,
            builderAddSignature(identifier, typeParameter.members),
          );

          path.node.superTypeParameters = builderPassSignature(identifier);

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

    visitClassExpression(path) {
      if (
        !path.node.superClass ||
        path.node.superClass.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      if (!typeParameters) {
        switch (path.parentPath.node.type) {
          case 'VariableDeclarator': {
            const identifier = `${data.entity.classifiedName}Signature`;
            const index = path.parentPath.parentPath.parentPath.name;

            path.parentPath.parentPath.parentPath.parentPath.value.splice(
              index,
              0,
              builderAddSignature(identifier),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          if (isSignature(typeParameter.members)) {
            break;
          }

          const identifier = `${data.entity.classifiedName}Signature`;
          const index = path.parentPath.parentPath.parentPath.name;

          path.parentPath.parentPath.parentPath.parentPath.value.splice(
            index,
            0,
            builderAddSignature(identifier, typeParameter.members),
          );

          path.node.superTypeParameters = builderPassSignature(identifier);

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

  return {
    interfaceName,
    newFile: AST.print(ast),
  };
}
