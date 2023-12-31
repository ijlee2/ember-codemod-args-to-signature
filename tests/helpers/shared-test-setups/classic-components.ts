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
  extensionMap: new Map(),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/classic-components',
  src: 'app/components',
};

export { codemodOptions, context, options };
