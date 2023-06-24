import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import {
  getComponentFilePath,
  type TransformedEntityName,
  transformEntityName,
} from '../utils/files.js';
import {
  createRegistry,
  getBaseComponentName,
  hasRegistry,
  passComponentNameToBaseComponent,
  updateReferences,
} from './create-registries/index.js';

type Data = {
  entity: TransformedEntityName;
};

function renameComponent(file: string, data: Data): string {
  const baseComponentName = getBaseComponentName(file);

  if (baseComponentName === undefined) {
    return file;
  }

  // eslint-disable-next-line prefer-const
  let { componentName, newFile } = passComponentNameToBaseComponent(file, {
    baseComponentName,
    data,
  });

  ({ newFile } = updateReferences(newFile, {
    baseComponentName,
    componentName,
    data,
  }));

  return newFile;
}

export function createRegistries(context: Context, options: Options): void {
  const { projectRoot } = options;

  const fileMap = new Map<string, string>();

  for (const [entityName, extensions] of context.entities) {
    const hasBackingClass = extensions.has('.ts');

    if (!hasBackingClass) {
      continue;
    }

    const filePath = getComponentFilePath(options)(entityName);

    const data = {
      entity: transformEntityName(entityName),
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (hasRegistry(file)) {
        continue;
      }

      file = renameComponent(file, data);
      file = createRegistry(file, data);

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createRegistries could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(`${message}\n`);
    }
  }

  createFiles(fileMap, options);
}
