// import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
// import { AST as ASTTemplate } from '@codemod-utils/ast-template';

import type { Signature } from '../../types/index.js';

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

  // ...

  if (classFile === undefined) {
    return;
  }

  // ...

  return undefined;
}
