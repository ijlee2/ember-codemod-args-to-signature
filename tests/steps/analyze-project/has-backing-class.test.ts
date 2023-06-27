import { assert, test } from '@codemod-utils/tests';

import { context } from '../../helpers/shared-test-setups/has-backing-class.js';

test('steps | analyze-project > has-backing-class', function () {
  const entityNames1 = Array.from(context.extensionMap.keys());
  const entityNames2 = Array.from(context.signatureMap.keys());

  assert.deepStrictEqual(entityNames1, entityNames2);
});
