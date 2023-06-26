import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > edge case (file is empty)', function () {
  const file = '';

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: undefined,
    importPath: undefined,
  });
});
