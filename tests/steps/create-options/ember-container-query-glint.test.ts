import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-container-query-glint.js';

test('steps | create-options > ember-container-query-glint', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
