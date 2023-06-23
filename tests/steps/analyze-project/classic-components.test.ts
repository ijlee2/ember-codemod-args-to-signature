import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/classic-components/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/classic-components.js';

test('steps | analyze-project > classic-components', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeProject(options), context);
});
