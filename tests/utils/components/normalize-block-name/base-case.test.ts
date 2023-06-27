import { assert, test } from '@codemod-utils/tests';

import { normalizeBlockName } from '../../../../src/utils/components.js';

test('utils | components | normalize-block-name > base case', function () {
  assert.strictEqual(normalizeBlockName('default'), 'default');
  assert.strictEqual(normalizeBlockName('header'), 'header');
  assert.strictEqual(normalizeBlockName('footer'), 'footer');
});
