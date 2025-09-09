import { assert, test } from '@codemod-utils/tests';

import { getComponentFilePath } from '../../../../src/utils/components.js';
import { options } from '../../../helpers/shared-test-setups/my-v1-app-nested.js';

test('utils | components | get-component-file-path > nested component structure', function () {
  function getFilePath(entityName: string): string {
    return getComponentFilePath(options)(entityName);
  }

  assert.strictEqual(getFilePath('index'), 'app/components/index/index.ts');

  assert.strictEqual(
    getFilePath('navigation-menu'),
    'app/components/navigation-menu/index.ts',
  );

  assert.strictEqual(
    getFilePath('widgets/widget-3'),
    'app/components/widgets/widget-3/index.ts',
  );
});
