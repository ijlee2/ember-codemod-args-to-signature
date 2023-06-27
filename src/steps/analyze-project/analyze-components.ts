import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';
import { getComponentFilePath } from '../../utils/components.js';
import { findArguments } from './find-arguments.js';
import { findBlocks } from './find-blocks.js';
import { findElement } from './find-element.js';

export function analyzeComponents(
  extensionMap: ExtensionMap,
  options: Options,
): SignatureMap {
  const { projectRoot } = options;

  const signatureMap: SignatureMap = new Map();

  for (const [entityName, extensions] of extensionMap) {
    const filePath = getComponentFilePath(options)(entityName);

    const hasTemplate = extensions.has('.hbs');

    const templateFile = hasTemplate
      ? readFileSync(join(projectRoot, filePath.replace('.ts', '.hbs')), 'utf8')
      : undefined;

    const Args = findArguments(options);
    const Blocks = findBlocks(templateFile);
    const Element = findElement(templateFile);

    signatureMap.set(entityName, {
      Args,
      Blocks,
      Element,
    });
  }

  return signatureMap;
}
