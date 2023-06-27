import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import {
  getComponentFilePath,
  transformEntityName,
} from '../utils/components.js';
import { updateSignature } from './update-signatures/index.js';

export function updateSignatures(context: Context, options: Options): void {
  const { projectRoot } = options;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [entityName, signature] of context.signatureMap) {
    const filePath = getComponentFilePath(options)(entityName);

    const data = {
      entity: transformEntityName(entityName),
      signature,
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');
      file = updateSignature(file, data);

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: updateSignatures could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  createFiles(fileMap, options);
}
