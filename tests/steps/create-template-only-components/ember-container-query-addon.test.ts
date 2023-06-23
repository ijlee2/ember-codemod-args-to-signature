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
} from '../../helpers/shared-test-setups/ember-container-query-addon.js';

test('steps | create-template-only-components > ember-container-query-addon', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-addon/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-addon/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
