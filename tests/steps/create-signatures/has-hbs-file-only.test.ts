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
} from '../../helpers/shared-test-setups/has-hbs-file-only.js';

test('steps | create-signatures > has-hbs-file-only', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-hbs-file-only/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-hbs-file-only/output',
  );

  loadFixture(inputProject, codemodOptions);

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
