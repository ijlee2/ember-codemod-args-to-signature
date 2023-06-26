import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/files.js';
import { convertArgsToSignature } from './convert-args-to-signature.js';
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
            AST.builders.tsInterfaceBody(convertArgsToSignature([])),
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
          if (isSignature(typeParameter.members)) {
            break;
          }

          const index = path.parentPath.parentPath.parentPath.name;

          path.parentPath.parentPath.parentPath.parentPath.value.splice(
            index,
            0,
            AST.builders.tsInterfaceDeclaration(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
              AST.builders.tsInterfaceBody(
                convertArgsToSignature(typeParameter.members),
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
            AST.builders.tsInterfaceBody(convertArgsToSignature([])),
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
          if (isSignature(typeParameter.members)) {
            break;
          }

          const index = path.parentPath.name;

          path.parentPath.parentPath.value.splice(
            index,
            0,
            AST.builders.tsInterfaceDeclaration(
              AST.builders.identifier(`${data.entity.classifiedName}Signature`),
              AST.builders.tsInterfaceBody(
                convertArgsToSignature(typeParameter.members),
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

  return {
    interfaceName,
    newFile: AST.print(ast),
  };
}
