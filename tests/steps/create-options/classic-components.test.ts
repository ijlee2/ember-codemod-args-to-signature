import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/classic-components.js';

test('steps | create-options > classic-components', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
