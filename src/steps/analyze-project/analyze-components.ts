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
    const hasTemplate = extensions.has('.hbs');
    const hasBackingClass = extensions.has('.ts');

    if (!hasTemplate) {
      signatureMap.set(entityName, {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      });

      continue;
    }

    const filePath = getComponentFilePath(options)(entityName);

    const classFile = hasBackingClass
      ? readFileSync(join(projectRoot, filePath), 'utf8')
      : undefined;

    const templateFile = readFileSync(
      join(projectRoot, filePath.replace(/\.ts$/, '.hbs')),
      'utf8',
    );

    try {
      const Args = findArguments(templateFile, classFile);
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
