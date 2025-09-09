import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Options, UnfilteredExtensionMap } from '../../types/index.js';
import { analyzeFilePaths } from '../../utils/components.js';

function normalizeComponentNames(
  extensionMap: UnfilteredExtensionMap,
): UnfilteredExtensionMap {
  return new Map(
    Array.from(extensionMap.entries()).map(([oldName, extensions]) => {
      const newName = oldName.replace(/\/index$/, '');

      return [newName, extensions];
    }),
  );
}

export function findComponents(options: Options): UnfilteredExtensionMap {
  const { componentStructure, projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: src,
      to: '',
    });
  });

  const extensionMap = analyzeFilePaths(filePaths);

  if (componentStructure === 'nested') {
    return normalizeComponentNames(extensionMap);
  }

  return extensionMap;
}
