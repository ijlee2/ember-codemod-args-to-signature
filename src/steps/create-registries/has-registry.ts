import { AST } from '@codemod-utils/ast-javascript';

export function hasRegistry(file: string): boolean {
  const traverse = AST.traverse(true);

  let hasRegistry = false;

  traverse(file, {
    visitTSModuleDeclaration(path) {
      // @ts-ignore: Assume that types from external packages are correct
      const moduleName = path.node.id.value;

      if (moduleName === '@glint/environment-ember-loose/registry') {
        hasRegistry = true;
      }

      return false;
    },
  });

  return hasRegistry;
}
