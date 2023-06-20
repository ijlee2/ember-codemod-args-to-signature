type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

type Options = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

export type { CodemodOptions, Options };
