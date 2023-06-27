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

test('steps | create-registries > has-backing-class', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-backing-class/output',
  );

  const context = {
    entities: new Map([
      ['navigation-menu', new Set(['.hbs', '.ts'])],
      ['products/product/card', new Set(['.hbs', '.ts'])],
      ['products/product/image', new Set(['.hbs', '.ts'])],
      ['tracks/list', new Set(['.hbs', '.ts'])],
      ['ui/form', new Set(['.hbs', '.ts'])],
      ['ui/form/checkbox', new Set(['.hbs', '.ts'])],
      ['ui/form/field', new Set(['.hbs', '.ts'])],
      ['ui/form/input', new Set(['.hbs', '.ts'])],
      ['ui/form/textarea', new Set(['.hbs', '.ts'])],
      ['ui/page', new Set(['.hbs', '.ts'])],
      ['widgets/widget-1', new Set(['.hbs', '.ts'])],
      ['widgets/widget-2', new Set(['.hbs', '.ts'])],
      ['widgets/widget-2/captions', new Set(['.hbs', '.ts'])],
      ['widgets/widget-2/stacked-chart', new Set(['.hbs', '.ts'])],
      ['widgets/widget-3', new Set(['.hbs', '.ts'])],
      [
        'widgets/widget-3/tour-schedule/responsive-image',
        new Set(['.hbs', '.ts']),
      ],
      ['widgets/widget-4', new Set(['.hbs', '.ts'])],
      ['widgets/widget-4/memo', new Set(['.hbs', '.ts'])],
      ['widgets/widget-4/memo/actions', new Set(['.hbs', '.ts'])],
      ['widgets/widget-4/memo/body', new Set(['.hbs', '.ts'])],
      ['widgets/widget-4/memo/header', new Set(['.hbs', '.ts'])],
    ]),
    signature: {
      Args: undefined,
      Blocks: undefined,
      Element: undefined,
    },
  };

  loadFixture(inputProject, codemodOptions);

  createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
