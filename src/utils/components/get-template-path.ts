import { join } from 'node:path';

import type {
  ComponentExtension,
  ComponentName,
  Options,
} from '../../types/index.js';

export function getTemplatePath(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): string {
  const { componentStructure, src } = options;

  const filePath =
    componentStructure === 'nested'
      ? join(src, componentName, 'index')
      : join(src, componentName);

  if (!extensions.has('.hbs')) {
    throw new RangeError('extensions must include `.hbs`');
  }

  return `${filePath}.hbs`;
}
