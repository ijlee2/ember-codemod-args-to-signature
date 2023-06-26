import { AST } from '@codemod-utils/ast-javascript';

export function getBaseComponentName(file: string): string | undefined {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;

  traverse(file, {
    visitImportDeclaration(path) {
      const importPath = path.node.source.value;

      switch (importPath) {
        case '@ember/component/template-only':
        case '@glimmer/component': {
          // @ts-ignore: Assume that types from external packages are correct
          baseComponentName = path.node.specifiers[0]!.local.name;

          return false;
        }
      }

      return false;
    },
  });

  return baseComponentName;
}
