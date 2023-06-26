import { AST } from '@codemod-utils/ast-javascript';

export function convertArgsToSignature(nodes: unknown[] = []) {
  return AST.builders.tsInterfaceBody([
    AST.builders.tsPropertySignature(
      AST.builders.identifier('Args'),
      // @ts-ignore: Assume that types from external packages are correct
      AST.builders.tsTypeAnnotation(AST.builders.tsTypeLiteral(nodes)),
      false,
    ),

    // AST.builders.tsPropertySignature(
    //   AST.builders.identifier('Blocks'),
    //   AST.builders.tsTypeAnnotation(
    //     AST.builders.tsTypeLiteral([
    //       AST.builders.tsPropertySignature(
    //         AST.builders.identifier('default'),
    //         AST.builders.tsTypeAnnotation(AST.builders.tsTupleType([])),
    //       ),
    //     ]),
    //   ),
    //   false,
    // ),

    // AST.builders.tsPropertySignature(
    //   AST.builders.identifier('Element'),
    //   AST.builders.tsTypeAnnotation(AST.builders.tsNullKeyword()),
    //   false,
    // ),
  ]);
}
