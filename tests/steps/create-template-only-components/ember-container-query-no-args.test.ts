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
} from '../../helpers/shared-test-setups/ember-container-query-no-args.js';

test('steps | create-template-only-components > ember-container-query-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/ember-container-query-no-args/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
