import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createTemplateOnlyComponents } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-declaration-file.js';

test('steps | create-template-only-components > has-declaration-file', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-declaration-file/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
