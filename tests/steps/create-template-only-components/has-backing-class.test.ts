import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createTemplateOnlyComponents } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-container-query.js';

test('steps | create-template-only-components > has-backing-class', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-backing-class/output',
  );

  const context = {
    entities: new Map([
      ['navigation-menu', new Set(['.hbs', '.ts'])],
      ['tracks/list', new Set(['.hbs', '.ts'])],
    ]),
  };

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
