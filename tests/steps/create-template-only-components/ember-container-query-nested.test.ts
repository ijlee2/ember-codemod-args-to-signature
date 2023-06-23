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
} from '../../helpers/shared-test-setups/ember-container-query-nested.js';

test('steps | create-template-only-components > ember-container-query-nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
