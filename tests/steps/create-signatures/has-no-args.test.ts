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
} from '../../helpers/shared-test-setups/ember-container-query-no-args.js';

test('steps | create-signatures > has-no-args', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-no-args/output',
  );

  const context = {
    entities: new Map([
      ['navigation-menu', new Set(['.hbs', '.ts'])],
      ['products/product/card', new Set(['.hbs', '.ts'])],
      ['products/product/image', new Set(['.hbs', '.ts'])],
      ['tracks', new Set(['.hbs', '.ts'])],
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

  createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
