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
} from '../../helpers/shared-test-setups/has-hbs-file-only.js';

test('steps | create-template-only-components > has-hbs-file-only', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-hbs-file-only/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-hbs-file-only/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
