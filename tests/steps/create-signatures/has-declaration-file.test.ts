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

test('steps | create-signatures > has-declaration-file', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-declaration-file/output',
  );

  const context = {
    entities: new Map([
      ['tracks', new Set(['.d.ts', '.hbs'])],
      ['widgets/widget-3/tour-schedule', new Set(['.d.ts', '.hbs'])],
    ]),
    signature: {
      Args: undefined,
      Blocks: undefined,
      Element: undefined,
    },
  };

  loadFixture(inputProject, codemodOptions);

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
