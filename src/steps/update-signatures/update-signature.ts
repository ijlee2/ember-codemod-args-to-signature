import { AST } from '@codemod-utils/ast-javascript';

import type { Signature } from '../../types/index.js';
import {
  builderCreateBlocksNode,
  builderCreateElementNode,
} from './builders.js';

type Data = {
  entity: {
    classifiedName: string;
  };
  signature: Signature;
};

function getBodyNode(node: unknown, key: 'Args' | 'Blocks' | 'Element') {
  // @ts-ignore: Assume that types from external packages are correct
  return node.body.body.find((node) => {
    if (node.type !== 'TSPropertySignature' || node.key.type !== 'Identifier') {
      return false;
    }

    return node.key.name === key;
  });
}

export function updateSignature(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  const identifier = `${data.entity.classifiedName}Signature`;

  const ast = traverse(file, {
    visitTSInterfaceDeclaration(path) {
      if (
        path.node.id.type !== 'Identifier' ||
        path.node.id.name !== identifier
      ) {
        return false;
      }

      const ArgsNode = getBodyNode(path.node, 'Args');

      const BlocksNode =
        getBodyNode(path.node, 'Blocks') ??
        builderCreateBlocksNode(data.signature);

      const ElementNode =
        getBodyNode(path.node, 'Element') ??
        builderCreateElementNode(data.signature);

      return AST.builders.tsInterfaceDeclaration(
        AST.builders.identifier(identifier),
        AST.builders.tsInterfaceBody(
          [ArgsNode, BlocksNode, ElementNode].filter(Boolean),
        ),
      );
    },
  });

  return AST.print(ast);
}
