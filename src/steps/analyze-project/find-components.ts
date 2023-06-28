import { join } from 'node:path';

import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { ExtensionMap, Options } from '../../types/index.js';
import { analyzeFilePaths } from './analyze-file-paths.js';

export function findComponents(options: Options): ExtensionMap {
  const { componentStructure, projectRoot, src } = options;

  const classFilePaths = findFiles(join(src, '**/*.{js,ts}'), {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: src,
      to: '',
    });
  });

  const templateFilePaths = findFiles(join(src, '**/*.hbs'), {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: src,
      to: '',
    });
  });

  const filePaths = [...classFilePaths, ...templateFilePaths].sort();

  const extensionMap = analyzeFilePaths(filePaths);

  if (componentStructure === 'nested') {
    return new Map(
      Array.from(extensionMap.entries()).map(([entityName, extensions]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, extensions];
      }),
    );
  }

  return extensionMap;
}
