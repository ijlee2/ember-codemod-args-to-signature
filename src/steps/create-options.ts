import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(projectType: CodemodOptions['projectType']): string {
  switch (projectType) {
    case 'app': {
      return 'app/components';
    }

    case 'v1-addon': {
      return 'addon/components';
    }

    case 'v2-addon': {
      return 'src/components';
    }
  }
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, convertJavaScript, projectRoot, projectType } =
    codemodOptions;

  return {
    componentStructure,
    convertJavaScript,
    projectRoot,
    src: getSrc(projectType),
  };
}
