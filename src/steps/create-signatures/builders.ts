import { AST } from '@codemod-utils/ast-javascript';

function builderConvertArgsToSignature(nodes: unknown[]) {
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

export function builderAddSignature(identifier: string, nodes: unknown[] = []) {
  return AST.builders.tsInterfaceDeclaration(
    AST.builders.identifier(identifier),
    builderConvertArgsToSignature(nodes),
  );
}

export function builderPassSignature(identifier: string) {
  return AST.builders.tsTypeParameterInstantiation([
    AST.builders.tsTypeReference(AST.builders.identifier(identifier)),
  ]);
}
