import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createSignatures } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-container-query.js';

test('steps | create-signatures > has-backing-class', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-backing-class/output',
  );

  const context = {
    entities: new Map([
      ['navigation-menu', new Set(['.hbs', '.ts'])],
      ['tracks/list', new Set(['.hbs', '.ts'])],
    ]),
  };

  loadFixture(inputProject, codemodOptions);

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
