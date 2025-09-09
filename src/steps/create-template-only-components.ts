import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { pascalize } from '@codemod-utils/ember';
import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { blueprintsRoot } from '../utils/blueprints.js';
import { getClassPath } from '../utils/components.js';

const blueprintFile = readFileSync(
  join(blueprintsRoot, 'ember-cli/template-only-component.ts'),
  'utf8',
);

export function createTemplateOnlyComponents(
  context: Context,
  options: Options,
): void {
  const { extensionMap } = context;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [componentName, extensions] of extensionMap) {
    const hasClassTypeScript = extensions.has('.ts');

    if (hasClassTypeScript) {
      continue;
    }

    const filePath = getClassPath(componentName, extensions, options);

    const data = {
      entity: {
        pascalizedName: pascalize(componentName),
      },
    };

    const file = processTemplate(blueprintFile, data);

    fileMap.set(filePath, file);
  }

  createFiles(fileMap, options);
}
