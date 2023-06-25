import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createRegistries } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-container-query.js';

test('steps | create-registries > has-hbs-file-only', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-hbs-file-only/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-hbs-file-only/output',
  );

  const context = {
    entities: new Map([
      ['ui/form/information', new Set(['.hbs'])],
      ['widgets/widget-5', new Set(['.hbs'])],
    ]),
  };

  loadFixture(inputProject, codemodOptions);

  createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
