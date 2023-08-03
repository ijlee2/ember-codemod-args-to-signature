type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

type Context = {
  extensionMap: ExtensionMap;
  signatureMap: SignatureMap;
};

type ExtensionMap = Map<string, Set<string>>;

type Signature = {
  Args: string[] | undefined;
  Blocks: Map<string, string[]> | undefined;
  Element: string[] | undefined;
};

type SignatureMap = Map<string, Signature>;

type Options = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

export type {
  CodemodOptions,
  Context,
  ExtensionMap,
  Options,
  Signature,
  SignatureMap,
};
