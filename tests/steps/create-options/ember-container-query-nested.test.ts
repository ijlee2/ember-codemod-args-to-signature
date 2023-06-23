import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-container-query-nested.js';

test('steps | create-options > ember-container-query-nested', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
