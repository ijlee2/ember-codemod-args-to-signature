import { assert, test } from '@codemod-utils/tests';

import { context } from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | analyze-project > has-no-args', function () {
  const entityNames1 = Array.from(context.extensionMap.keys());
  const entityNames2 = Array.from(context.signatureMap.keys());

  assert.deepStrictEqual(entityNames1, entityNames2);
});
