import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';
import { getClassPath, getTemplatePath } from '../../utils/components.js';
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

    const classFilePath = getClassPath(entityName, extensions, options);

    const classFile = hasBackingClass
      ? readFileSync(join(projectRoot, classFilePath), 'utf8')
      : undefined;

    const templateFilePath = getTemplatePath(entityName, extensions, options);

    const templateFile = readFileSync(
      join(projectRoot, templateFilePath),
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
      let message = `WARNING: analyzeComponents could not parse \`${entityName}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  return signatureMap;
}
