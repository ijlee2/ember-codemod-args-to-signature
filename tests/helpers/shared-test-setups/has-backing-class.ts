import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-backing-class',
  src: 'app/components',
};

const context: Context = {
  extensionMap: new Map([
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
  signatureMap: new Map([
    [
      'navigation-menu',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'products/product/card',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'products/product/image',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'tracks/list',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/checkbox',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/field',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/input',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/textarea',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/page',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-1',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-2',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-2/captions',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-2/stacked-chart',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-3',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-3/tour-schedule/responsive-image',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/actions',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/body',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/header',
      {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-backing-class',
  src: 'app/components',
};

export { codemodOptions, context, options };
