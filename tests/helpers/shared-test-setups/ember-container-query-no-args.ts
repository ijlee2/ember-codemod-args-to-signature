import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/ember-container-query-no-args',
  src: 'app/components',
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/ember-container-query-no-args',
  src: 'app/components',
};

export { codemodOptions, options };
