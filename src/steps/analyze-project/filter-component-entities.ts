import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';

import type { Entities, Options } from '../../types/index.js';
import { getComponentFilePath } from '../../utils/components.js';

function isSupported(file: string): boolean {
  const traverse = AST.traverse(true);

  let isClassicComponent = false;
  let isComponent = false;

  traverse(file, {
    visitImportDeclaration(path) {
      const importPath = path.node.source.value;

      switch (importPath) {
        case '@ember/component': {
          isClassicComponent = true;
          isComponent = true;

          break;
        }

        case '@ember/component/template-only':
        case '@glimmer/component': {
          isComponent = true;

          break;
        }
      }

      return false;
    },
  });

  return isComponent && !isClassicComponent;
}

export function filterComponentEntities(
  entities: Entities,
  options: Options,
): Entities {
  const { projectRoot } = options;

  const filteredEntities: Entities = new Map();

  for (const [entityName, extensions] of entities) {
    const isJavaScript = extensions.has('.js');

    if (isJavaScript) {
      continue;
    }

    const isTypeScript = extensions.has('.ts');

    if (isTypeScript) {
      const filePath = getComponentFilePath(options)(entityName);
      const file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (!isSupported(file)) {
        continue;
      }
    }

    filteredEntities.set(entityName, extensions);
  }

  return filteredEntities;
}
