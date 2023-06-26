import { join } from 'node:path';

import type { Options } from '../../types/index.js';

export function getComponentFilePath(options: Options) {
  const { componentStructure, src } = options;

  return function (entityName: string): string {
    let filePath = join(src, entityName);

    if (componentStructure === 'nested') {
      filePath += '/index';
    }

    filePath += '.ts';

    return filePath;
  };
}
