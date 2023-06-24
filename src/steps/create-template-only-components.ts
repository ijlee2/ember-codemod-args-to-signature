import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { createFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { blueprintsRoot } from '../utils/blueprints.js';
import { getComponentFilePath, transformEntityName } from '../utils/files.js';

const blueprintFile = readFileSync(
  join(blueprintsRoot, 'ember-cli/template-only-component.ts'),
  'utf8',
);

function createBackingClass(entityName: string): string {
  const entity = transformEntityName(entityName);

  const file = processTemplate(blueprintFile, { entity });

  return file;
}

export function createTemplateOnlyComponents(
  context: Context,
  options: Options,
): void {
  const fileMap = new Map<string, string>();

  for (const [entityName, extensions] of context.entities) {
    const hasBackingClass = extensions.has('.ts');

    if (hasBackingClass) {
      continue;
    }

    const filePath = getComponentFilePath(options)(entityName);
    const file = createBackingClass(entityName);

    fileMap.set(filePath, file);
  }

  createFiles(fileMap, options);
}
