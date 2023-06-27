import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-declaration-file',
  src: 'app/components',
};

const context: Context = {
  extensionMap: new Map([
    ['tracks', new Set(['.d.ts', '.hbs'])],
    ['widgets/widget-3/tour-schedule', new Set(['.d.ts', '.hbs'])],
  ]),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-declaration-file',
  src: 'app/components',
};

export { codemodOptions, context, options };
