import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getClassPath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.gts']);

  const options: Options = {
    componentStructure: 'flat',
    projectRoot: 'tmp/my-v1-app',
    src: 'app/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > app (template tag)', function () {
  assert.strictEqual(getPath('index'), 'app/components/index.gts');

  assert.strictEqual(
    getPath('navigation-menu'),
    'app/components/navigation-menu.gts',
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    'app/components/widgets/widget-3.gts',
  );
});
