import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getTemplatePath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs', '.ts']);

  const options: Options = {
    componentStructure: 'flat',
    convertJavaScript: false,
    projectRoot: 'tmp/my-v1-addon',
    src: 'addon/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-class-path > v1 addon (flat)', function () {
  assert.strictEqual(getPath('index'), 'addon/components/index.hbs');

  assert.strictEqual(
    getPath('navigation-menu'),
    'addon/components/navigation-menu.hbs',
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    'addon/components/widgets/widget-3.hbs',
  );
});
