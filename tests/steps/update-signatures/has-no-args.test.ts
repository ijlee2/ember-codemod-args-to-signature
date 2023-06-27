import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateSignatures } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | update-signatures > has-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-signatures/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-signatures/has-no-args/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
