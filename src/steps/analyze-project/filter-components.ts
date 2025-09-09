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

  const newExtensionMap: ExtensionMap = new Map();

  for (const [componentName, extensions] of extensionMap) {
    const hasClassJavaScript = extensions.has('.js');

    if (hasClassJavaScript) {
      continue;
    }

    const hasClassTypeScript = (extensions as Set<ComponentExtension>).has(
      '.ts',
    );

    if (hasClassTypeScript) {
      const filePath = getClassPath(
        componentName,
        extensions as Set<ComponentExtension>,
        options,
      );

      const file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (!isSupported(file)) {
        continue;
      }
    }

    newExtensionMap.set(componentName, extensions as Set<ComponentExtension>);
  }

  return newExtensionMap;
}
