import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-addon-template-tag.js';

test('steps | create-options > my-v2-addon-template-tag', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
