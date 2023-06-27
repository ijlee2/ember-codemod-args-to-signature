import { AST } from '@codemod-utils/ast-template';

import { getHtmlInterface } from '../../utils/components.js';

export function findElement(file: string | undefined): string[] | undefined {
  if (file === undefined) {
    return;
  }

  const traverse = AST.traverse();

  const elementTags: string[] = [];

  traverse(file, {
    ElementNode(node) {
      const hasSplattributes = node.attributes.find(({ name }) => {
        return name === '...attributes';
      });

      if (!hasSplattributes) {
        return;
      }

      elementTags.push(node.tag);
    },
  });

  if (elementTags.length === 0) {
    return;
  }

  const htmlInterfaces = elementTags.map(getHtmlInterface);

  return Array.from(new Set(htmlInterfaces)).sort();
}
