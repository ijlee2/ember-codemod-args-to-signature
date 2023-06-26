import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Entities, Options } from '../../types/index.js';
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

export function filterComponentEntities(
  entities: Entities,
  options: Options,
): Entities {
  const { projectRoot } = options;

  const filteredEntities: Entities = new Map();

  for (const [entityName, extensions] of entities) {
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

    filteredEntities.set(entityName, extensions);
  }

  return filteredEntities;
}
