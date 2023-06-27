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
} from '../../helpers/shared-test-setups/has-declaration-file.js';

test('steps | create-signatures > has-declaration-file', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-declaration-file/output',
  );

  loadFixture(inputProject, codemodOptions);

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
