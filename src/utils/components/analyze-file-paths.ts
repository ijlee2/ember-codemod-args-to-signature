import { join } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { ExtensionMap } from '../../types/index.js';

export function analyzeFilePaths(filePaths: string[]): ExtensionMap {
  const extensionMap: ExtensionMap = new Map();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parseFilePath(filePath);
    const entityName = join(dir, name);

    if (extensionMap.has(entityName)) {
      extensionMap.get(entityName)!.add(ext);

      return;
    }

    extensionMap.set(entityName, new Set([ext]));
  });

  return extensionMap;
}
