/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/files.js';
import { convertArgsToSignature } from './convert-args-to-signature.js';
import { isSignature } from './is-signature.js';

type Options = {
  data: {
    entity: TransformedEntityName;
  };
  interfaceName: string;
};

export function updateReferences(
  file: string,
  options: Options,
): {
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { interfaceName, data } = options;

  const ast = traverse(file, {
    visitTSInterfaceDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      path.node.id.name = `${data.entity.classifiedName}Signature`;

      const typeParameter = path.node.body;
      if (isSignature(typeParameter.body)) {
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
      if (isSignature(typeParameter.members)) {
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

  return {
    newFile: AST.print(ast),
  };
}
