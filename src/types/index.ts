type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

type Context = {
  entities: Entities;
  signature: {
    Args: Set<string> | undefined;
    Blocks: Set<string> | undefined;
    Element: string | undefined;
  };
};

type Entities = Map<string, Set<string>>;

type Options = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

export type { CodemodOptions, Context, Entities, Options };
