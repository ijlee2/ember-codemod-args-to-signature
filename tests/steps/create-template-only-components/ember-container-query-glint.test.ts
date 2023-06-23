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
} from '../../helpers/shared-test-setups/ember-container-query-glint.js';

test('steps | create-template-only-components > ember-container-query-glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-glint/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
