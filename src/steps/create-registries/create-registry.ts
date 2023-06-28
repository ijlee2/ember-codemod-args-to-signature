import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  entity: {
    classifiedName: string;
    doubleColonizedName: string;
    name: string;
  };
};

export function createRegistry(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  const ast = traverse(file);

  // @ts-ignore: Assume that types from external packages are correct
  const nodes = ast.program.body;

  const registryEntries = AST.builders.tsInterfaceBody([
    AST.builders.tsPropertySignature(
      AST.builders.stringLiteral(data.entity.doubleColonizedName),
      AST.builders.tsTypeAnnotation(
        AST.builders.tsTypeQuery(
          AST.builders.identifier(`${data.entity.classifiedName}Component`),
        ),
      ),
    ),
    AST.builders.tsPropertySignature(
      AST.builders.stringLiteral(data.entity.name),
      AST.builders.tsTypeAnnotation(
        AST.builders.tsTypeQuery(
          AST.builders.identifier(`${data.entity.classifiedName}Component`),
        ),
      ),
    ),
  ]);

  const registryNode = AST.builders.tsModuleDeclaration(
    AST.builders.stringLiteral('@glint/environment-ember-loose/registry'),
    AST.builders.tsModuleBlock([
      AST.builders.exportDefaultDeclaration(
        AST.builders.tsInterfaceDeclaration(
          AST.builders.identifier('Registry'),
          registryEntries,
        ),
      ),
    ]),
  );

  registryNode.declare = true;

  nodes.push(registryNode);

  return AST.print(ast);
}
