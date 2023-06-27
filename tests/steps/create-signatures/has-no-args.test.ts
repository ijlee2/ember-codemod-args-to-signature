import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createSignatures } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | create-signatures > has-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-no-args/output',
  );

  loadFixture(inputProject, codemodOptions);

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
