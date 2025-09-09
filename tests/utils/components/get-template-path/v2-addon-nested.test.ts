import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getTemplatePath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs', '.ts']);

  const options: Options = {
    componentStructure: 'nested',
    projectRoot: 'tmp/my-v2-addon',
    src: 'src/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-class-path > v2 addon (nested)', function () {
  assert.strictEqual(getPath('index'), 'src/components/index/index.hbs');

  assert.strictEqual(
    getPath('navigation-menu'),
    'src/components/navigation-menu/index.hbs',
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    'src/components/widgets/widget-3/index.hbs',
  );
});
