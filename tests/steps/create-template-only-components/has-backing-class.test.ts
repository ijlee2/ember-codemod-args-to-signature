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
} from '../../helpers/shared-test-setups/has-backing-class.js';

test('steps | create-template-only-components > has-backing-class', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-backing-class/output',
  );

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
