import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  ComponentExtension,
  ExtensionMap,
  Options,
  UnfilteredExtensionMap,
} from '../../types/index.js';
import { getBaseComponent, getClassPath } from '../../utils/components.js';

function isSupported(file: string): boolean {
  const { importPath } = getBaseComponent(file);

  const isComponent = importPath !== undefined;
  const isClassicComponent = importPath === '@ember/component';

  return isComponent && !isClassicComponent;
}

export function filterComponents(
  extensionMap: UnfilteredExtensionMap,
  options: Options,
): ExtensionMap {
  const { projectRoot } = options;

  const filteredExtensionMap: ExtensionMap = new Map();

  for (const [entityName, extensions] of extensionMap) {
    const isJavaScript = extensions.has('.js');

    if (isJavaScript) {
      continue;
    }

    const isTypeScript = (extensions as Set<ComponentExtension>).has('.ts');

    if (isTypeScript) {
      const filePath = getClassPath(
        entityName,
        extensions as Set<ComponentExtension>,
        options,
      );

      const file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (!isSupported(file)) {
        continue;
      }
    }

    filteredExtensionMap.set(entityName, extensions as Set<ComponentExtension>);
  }

  return filteredExtensionMap;
}
