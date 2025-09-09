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

  const filteredEntries = Array.from(extensionMap.entries()).filter(
    ([componentName, extensions]) => {
      const hasClassJavaScript = extensions.has('.js');

      if (hasClassJavaScript) {
        return false;
      }

      const hasClassTypeScript = extensions.has('.ts');

      // hbs file only
      if (!hasClassTypeScript) {
        return true;
      }

      const filePath = getClassPath(
        componentName,
        extensions as Set<ComponentExtension>,
        options,
      );

      const file = readFileSync(join(projectRoot, filePath), 'utf8');

      return isSupported(file);
    },
  );

  return new Map(filteredEntries) as unknown as ExtensionMap;
}
