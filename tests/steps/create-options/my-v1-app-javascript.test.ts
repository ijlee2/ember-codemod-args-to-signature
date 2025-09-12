import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-javascript.js';

test('steps | create-options > my-v1-app-javascript', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
