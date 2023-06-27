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
} from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | create-template-only-components > has-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-no-args/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
