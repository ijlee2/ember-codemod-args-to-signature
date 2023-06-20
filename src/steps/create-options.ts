import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, projectRoot, src } = codemodOptions;

  return {
    componentStructure,
    projectRoot,
    src,
  };
}
