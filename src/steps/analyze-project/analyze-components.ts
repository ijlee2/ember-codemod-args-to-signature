import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';
import { getComponentFilePath } from '../../utils/components.js';
import {
  findArguments,
  findBlocks,
  findElement,
} from './analyze-components/index.js';

export function analyzeComponents(
  extensionMap: ExtensionMap,
  options: Options,
): SignatureMap {
  const { projectRoot } = options;

  const signatureMap: SignatureMap = new Map();

  for (const [entityName, extensions] of extensionMap) {
    const filePath = getComponentFilePath(options)(entityName);

    const hasBackingClass = extensions.has('.ts');
    const hasTemplate = extensions.has('.hbs');

    const classFile = hasBackingClass
      ? readFileSync(join(projectRoot, filePath), 'utf8')
      : undefined;

    const templateFile = hasTemplate
      ? readFileSync(join(projectRoot, filePath.replace('.ts', '.hbs')), 'utf8')
      : undefined;

    try {
      const Args = findArguments({ classFile, templateFile });
      const Blocks = findBlocks(templateFile);
      const Element = findElement(templateFile);

      signatureMap.set(entityName, {
        Args,
        Blocks,
        Element,
      });
    } catch (error) {
      let message = `WARNING: analyzeComponents could not parse \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  return signatureMap;
}
