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
} from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | create-template-only-components > has-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-template-only-components/has-no-args/output',
  );

  const context = {
    entities: new Map([
      ['navigation-menu', new Set(['.hbs', '.ts'])],
      ['tracks/list', new Set(['.hbs', '.ts'])],
    ]),
    signature: {
      Args: undefined,
      Blocks: undefined,
      Element: undefined,
    },
  };

  loadFixture(inputProject, codemodOptions);

  createTemplateOnlyComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
