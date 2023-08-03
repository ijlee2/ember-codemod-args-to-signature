// import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

import type { Signature } from '../../../types/index.js';

function analyzeTemplate(file: string, args: Set<string>): void {
  const traverse = ASTTemplate.traverse();

  traverse(file, {
    PathExpression(node) {
      if (node.head.type !== 'AtHead') {
        return;
      }

      const argumentName = node.original.replace(/^@/, '');
      const key = argumentName.split('.')[0]!;

      args.add(key);
    },
  });
}

export function findArguments({
  classFile,
  templateFile,
}: {
  classFile: string | undefined;
  templateFile: string | undefined;
}): Signature['Args'] {
  if (templateFile === undefined) {
    return;
  }

  const args = new Set<string>();

  analyzeTemplate(templateFile, args);

  if (classFile !== undefined) {
    // analyzeClass(classFile, args);
  }

  return Array.from(args).sort();
}
