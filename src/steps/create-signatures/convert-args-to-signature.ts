/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AST } from '@codemod-utils/ast-javascript';

type Options = {
  b: (typeof AST)['builders'];
  nodes: unknown[];
};

export function convertArgsToSignature(options: Options) {
  const { b, nodes } = options;

  return [
    b.tsPropertySignature(
      b.identifier('Args'),
      // @ts-ignore: Assume that types from external packages are correct
      b.tsTypeAnnotation(b.tsTypeLiteral(nodes)),
      false,
    ),

    // b.tsPropertySignature(
    //   b.identifier('Blocks'),
    //   b.tsTypeAnnotation(
    //     b.tsTypeLiteral([
    //       b.tsPropertySignature(
    //         b.identifier('default'),
    //         b.tsTypeAnnotation(b.tsTupleType([])),
    //       ),
    //     ]),
    //   ),
    //   false,
    // ),

    // b.tsPropertySignature(
    //   b.identifier('Element'),
    //   b.tsTypeAnnotation(b.tsNullKeyword()),
    //   false,
    // ),
  ];
}
