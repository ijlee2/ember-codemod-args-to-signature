import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { classify, doubleColonize } from '@codemod-utils/ember-cli-string';
import { createFiles } from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { blueprintsRoot } from '../utils/blueprints.js';
import { getComponentFilePath } from '../utils/files.js';

function createBackingClass(entityName: string, options: Options): void {
  const entity = {
    classifiedName: classify(entityName),
    doubleColonizedName: doubleColonize(entityName),
    name: entityName,
  };

  const filePath = getComponentFilePath(options)(entityName);

  const blueprintFile = readFileSync(
    join(blueprintsRoot, 'ember-cli/template-only-component.ts'),
    'utf8',
  );

  const file = processTemplate(blueprintFile, {
    entity,
    options,
  });

  createFiles(new Map([[filePath, file]]), options);
}

export function createTemplateOnlyComponents(
  context: Context,
  options: Options,
): void {
  for (const [entityName, extensions] of context.entities) {
    const hasBackingClass = extensions.has('.ts');

    if (hasBackingClass) {
      continue;
    }

    createBackingClass(entityName, options);

    extensions.add('.ts');
  }
}
