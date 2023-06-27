import { AST } from '@codemod-utils/ast-javascript';

export function builderConvertArgsToSignature(nodes: unknown[] = []) {
  return [
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
  ];
}

export function builderCreateSignature(identifier: string, members: unknown[]) {
  return AST.builders.tsInterfaceDeclaration(
    AST.builders.identifier(identifier),
    // @ts-ignore: Assume that types from external packages are correct
    AST.builders.tsInterfaceBody(members),
  );
}

export function builderPassSignature(identifier: string) {
  return AST.builders.tsTypeParameterInstantiation([
    AST.builders.tsTypeReference(AST.builders.identifier(identifier)),
  ]);
}
