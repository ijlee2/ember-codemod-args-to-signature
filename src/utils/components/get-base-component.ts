import { AST } from '@codemod-utils/ast-javascript';

type BaseComponent = {
  baseComponentName: string | undefined;
  importPath: string | undefined;
};

export function getBaseComponent(file: string): BaseComponent {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;
  let importPath: string | undefined;

  traverse(file, {
    visitImportDeclaration(path) {
      switch (path.node.source.value) {
        case '@ember/component':
        case '@ember/component/template-only':
        case '@glimmer/component': {
          // @ts-ignore: Assume that types from external packages are correct
          const defaultImport = path.node.specifiers.find(({ type }) => {
            return type === 'ImportDefaultSpecifier';
          });

          if (!defaultImport) {
            return false;
          }

          // @ts-ignore: Assume that types from external packages are correct
          baseComponentName = defaultImport.local.name;
          importPath = path.node.source.value as string;

          return false;
        }
      }

      return false;
    },
  });

  return {
    baseComponentName,
    importPath,
  };
}
