import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'nested',
  projectRoot: 'tmp/ember-container-query-nested',
  src: 'app/components',
};

const options: Options = {
  componentStructure: 'nested',
  projectRoot: 'tmp/ember-container-query-nested',
  src: 'app/components',
};

export { codemodOptions, options };
