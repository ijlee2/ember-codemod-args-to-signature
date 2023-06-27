import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-hbs-file-only',
  src: 'app/components',
};

const context: Context = {
  extensionMap: new Map([
    ['ui/form/information', new Set(['.hbs'])],
    ['widgets/widget-5', new Set(['.hbs'])],
  ]),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-hbs-file-only',
  src: 'app/components',
};

export { codemodOptions, context, options };
