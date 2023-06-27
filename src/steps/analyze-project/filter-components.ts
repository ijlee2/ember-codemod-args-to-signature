import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ExtensionMap, Options } from '../../types/index.js';
import {
  getBaseComponent,
  getComponentFilePath,
} from '../../utils/components.js';

function isSupported(file: string): boolean {
  const { importPath } = getBaseComponent(file);

  const isComponent = importPath !== undefined;
  const isClassicComponent = importPath === '@ember/component';

  return isComponent && !isClassicComponent;
}

export function filterComponents(
  extensionMap: ExtensionMap,
  options: Options,
): ExtensionMap {
  const { projectRoot } = options;

  const filteredExtensionMap: ExtensionMap = new Map();

  for (const [entityName, extensions] of extensionMap) {
    const isJavaScript = extensions.has('.js');

    if (isJavaScript) {
      continue;
    }

    const isTypeScript = extensions.has('.ts');

    if (isTypeScript) {
      const filePath = getComponentFilePath(options)(entityName);
      const file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (!isSupported(file)) {
        continue;
      }
    }

    filteredExtensionMap.set(entityName, extensions);
  }

  return filteredExtensionMap;
}
