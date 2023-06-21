import { join } from 'node:path';

import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Entities, Options } from '../../types/index.js';
import { analyzeFilePaths } from './analyze-file-paths.js';

export function findComponentEntities(options: Options): Entities {
  const { componentStructure, projectRoot, src } = options;

  const classFilePaths = findFiles(join(src, '**/*.{js,ts}'), {
    ignoreList: [join(src, '**/*.d.ts')],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: src,
      to: '',
    });
  });

  const declarationFilePaths = findFiles(join(src, '**/*.d.ts'), {
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

  const filePaths = [
    ...classFilePaths,
    ...declarationFilePaths,
    ...templateFilePaths,
  ].sort();

  const entities = analyzeFilePaths(filePaths);

  if (componentStructure === 'nested') {
    return new Map(
      Array.from(entities.entries()).map(([entityName, extensions]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, extensions];
      }),
    );
  }

  return entities;
}
