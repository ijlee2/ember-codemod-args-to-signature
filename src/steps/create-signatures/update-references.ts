import { AST } from '@codemod-utils/ast-javascript';

import type { TransformedEntityName } from '../../utils/components.js';
import { builderAddSignature } from './builders.js';
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

      const identifier = `${data.entity.classifiedName}Signature`;
      const nodes = path.node.body.body;

      if (isSignature(nodes)) {
        return AST.builders.tsInterfaceDeclaration(
          AST.builders.identifier(identifier),
          AST.builders.tsInterfaceBody(nodes),
        );
      }

      return builderAddSignature(identifier, nodes);
    },

    visitTSTypeAliasDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      if (path.node.id.name !== interfaceName) {
        return false;
      }

      const identifier = `${data.entity.classifiedName}Signature`;
      // @ts-ignore: Assume that types from external packages are correct
      const nodes = path.node.typeAnnotation.members;

      if (isSignature(nodes)) {
        return AST.builders.tsInterfaceDeclaration(
          AST.builders.identifier(identifier),
          AST.builders.tsInterfaceBody(nodes),
        );
      }

      return builderAddSignature(identifier, nodes);
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
