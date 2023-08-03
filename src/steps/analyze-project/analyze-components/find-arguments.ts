// import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

import type { Signature } from '../../../types/index.js';

function analyzeTemplate(file: string): Set<string> {
  const traverse = ASTTemplate.traverse();
  const args = new Set<string>();

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

  return args;
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

  const argsFromTemplate = analyzeTemplate(templateFile);

  if (classFile !== undefined) {
    // const argsFromClass = analyzeClass(classFile);
  }

  const args = new Set([...argsFromTemplate]);

  return Array.from(args).sort();
}
