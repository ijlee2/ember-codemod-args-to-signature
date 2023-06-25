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

test('steps | create-registries > has-declaration-file', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-declaration-file/output',
  );

  const context = {
    entities: new Map([
      ['tracks', new Set(['.d.ts', '.hbs'])],
      ['widgets/widget-3/tour-schedule', new Set(['.d.ts', '.hbs'])],
    ]),
  };

  loadFixture(inputProject, codemodOptions);

  createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
