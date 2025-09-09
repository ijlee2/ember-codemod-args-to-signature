import { join } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type {
  UnfilteredComponentExtension,
  UnfilteredExtensionMap,
} from '../../types/index.js';

export function analyzeFilePaths(filePaths: string[]): UnfilteredExtensionMap {
  const extensionMap: UnfilteredExtensionMap = new Map();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parseFilePath(filePath) as {
      dir: string;
      ext: UnfilteredComponentExtension;
      name: string;
    };

    const entityName = join(dir, name);

    if (extensionMap.has(entityName)) {
      extensionMap.get(entityName)!.add(ext);

      return;
    }

    extensionMap.set(entityName, new Set([ext]));
  });

  return extensionMap;
}
