import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-addon-template-tag/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/my-v2-addon-template-tag.js';

test('steps | analyze-project > my-v2-addon-template-tag', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeProject(options), context);
}).ignore();
