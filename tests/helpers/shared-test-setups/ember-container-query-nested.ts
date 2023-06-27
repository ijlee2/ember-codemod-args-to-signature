import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'nested',
  projectRoot: 'tmp/ember-container-query-nested',
  src: 'app/components',
};

const context: Context = {
  extensionMap: new Map([
    ['navigation-menu', new Set(['.hbs', '.ts'])],
    ['products/product/card', new Set(['.hbs', '.ts'])],
    ['products/product/image', new Set(['.hbs', '.ts'])],
    ['tracks', new Set(['.d.ts', '.hbs'])],
    ['tracks/list', new Set(['.hbs', '.ts'])],
    ['tracks/table', new Set(['.d.ts', '.hbs'])],
    ['ui/form', new Set(['.hbs', '.ts'])],
    ['ui/form/checkbox', new Set(['.hbs', '.ts'])],
    ['ui/form/field', new Set(['.hbs', '.ts'])],
    ['ui/form/information', new Set(['.d.ts', '.hbs'])],
    ['ui/form/input', new Set(['.hbs', '.ts'])],
    ['ui/form/textarea', new Set(['.hbs', '.ts'])],
    ['ui/page', new Set(['.hbs', '.ts'])],
    ['widgets/widget-1', new Set(['.hbs', '.ts'])],
    ['widgets/widget-1/item', new Set(['.d.ts', '.hbs'])],
    ['widgets/widget-2', new Set(['.hbs', '.ts'])],
    ['widgets/widget-2/captions', new Set(['.hbs', '.ts'])],
    ['widgets/widget-2/stacked-chart', new Set(['.hbs', '.ts'])],
    ['widgets/widget-3', new Set(['.hbs', '.ts'])],
    ['widgets/widget-3/tour-schedule', new Set(['.d.ts', '.hbs'])],
    [
      'widgets/widget-3/tour-schedule/responsive-image',
      new Set(['.hbs', '.ts']),
    ],
    ['widgets/widget-4', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/actions', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/body', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/header', new Set(['.hbs', '.ts'])],
    ['widgets/widget-5', new Set(['.d.ts', '.hbs'])],
  ]),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'nested',
  projectRoot: 'tmp/ember-container-query-nested',
  src: 'app/components',
};

export { codemodOptions, context, options };
