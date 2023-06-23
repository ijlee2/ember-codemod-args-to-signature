import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/classic-components',
  src: 'app/components',
};

const context: Context = {
  entities: new Map([
    ['navigation-menu', new Set(['.hbs', '.ts'])],
    ['products/product/card', new Set(['.hbs', '.js'])],
    ['products/product/image', new Set(['.hbs', '.ts'])],
    ['tracks', new Set(['.hbs', '.js'])],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/classic-components',
  src: 'app/components',
};

export { codemodOptions, context, options };
