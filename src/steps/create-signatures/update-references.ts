import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/components.js';
import {
  builderConvertArgsToSignature,
  builderCreateSignature,
} from './builders.js';
import { isSignature } from './is-signature.js';

type Options = {
  data: {
    entity: TransformedEntityName;
  };
  interfaceName: string;
};

export function updateReferences(file: string, options: Options): string {
  const traverse = AST.traverse(true);

  const { interfaceName, data } = options;

  const ast = traverse(file, {
    visitTSInterfaceDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      const members = isSignature(path.node.body.body)
        ? path.node.body.body
        : builderConvertArgsToSignature(path.node.body.body);

      const identifier = `${data.entity.classifiedName}Signature`;

      return builderCreateSignature(identifier, members);
    },

    visitTSTypeAliasDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      // @ts-ignore: Assume that types from external packages are correct
      const members = isSignature(path.node.typeAnnotation.members)
        ? // @ts-ignore: Assume that types from external packages are correct
          path.node.typeAnnotation.members
        : // @ts-ignore: Assume that types from external packages are correct
          builderConvertArgsToSignature(path.node.typeAnnotation.members);

      const identifier = `${data.entity.classifiedName}Signature`;

      return builderCreateSignature(identifier, members);
    },

    visitTSTypeReference(path) {
      if (
        path.node.typeName.type !== 'Identifier' ||
        path.node.typeName.name !== interfaceName ||
        path.node.typeName.name.endsWith('Signature')
      ) {
        return false;
      }

      path.node.typeName.name = `${data.entity.classifiedName}Signature['Args']`;

      return false;
    },
  });

  return AST.print(ast);
}
