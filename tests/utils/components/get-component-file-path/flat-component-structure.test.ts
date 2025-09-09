import { assert, test } from '@codemod-utils/tests';

import { getComponentFilePath } from '../../../../src/utils/components.js';
import { options } from '../../../helpers/shared-test-setups/my-v1-app.js';

test('utils | components | get-component-file-path > flat component structure', function () {
  function getFilePath(entityName: string): string {
    return getComponentFilePath(options)(entityName);
  }

  assert.strictEqual(getFilePath('index'), 'app/components/index.ts');

  assert.strictEqual(
    getFilePath('navigation-menu'),
    'app/components/navigation-menu.ts',
  );

  assert.strictEqual(
    getFilePath('widgets/widget-3'),
    'app/components/widgets/widget-3.ts',
  );
});
