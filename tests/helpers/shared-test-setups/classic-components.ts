import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/classic-components',
  src: 'app/components',
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/classic-components',
  src: 'app/components',
};

export { codemodOptions, options };
