import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { pascalize } from '@codemod-utils/ember';
import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getClassPath } from '../utils/components.js';
import { createSignature } from './create-signatures/index.js';

export function createSignatures(context: Context, options: Options): void {
  const { extensionMap } = context;
  const { projectRoot } = options;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [entityName, extensions] of extensionMap) {
    const filePath = getClassPath(entityName, extensions, options);

    const data = {
      entity: {
        pascalizedName: pascalize(entityName),
      },
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');
      file = createSignature(file, data);

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createSignatures could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  createFiles(fileMap, options);
}
