import { AST } from '@codemod-utils/ast-javascript';

import type { Signature } from '../../types/index.js';

export function builderCreateElementNode(signature: Signature) {
  if (signature.Element === undefined) {
    return;
  }

  return AST.builders.tsPropertySignature(
    AST.builders.identifier('Element'),
    AST.builders.tsTypeAnnotation(
      AST.builders.tsUnionType(
        signature.Element.map((htmlInterface) => {
          return AST.builders.tsTypeReference(
            AST.builders.identifier(htmlInterface),
          );
        }),
      ),
    ),
    false,
  );
}
