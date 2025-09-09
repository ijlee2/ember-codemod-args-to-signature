type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  projectType: 'app' | 'v1-addon' | 'v2-addon';
};

type ComponentName = string;

type Context = {
  extensionMap: ExtensionMap;
  signatureMap: SignatureMap;
};

type UnfilteredComponentExtension = '.hbs' | '.js' | '.ts';

type UnfilteredExtensionMap = Map<
  ComponentName,
  Set<UnfilteredComponentExtension>
>;

type ComponentExtension = Exclude<UnfilteredComponentExtension, '.js'>;

type ExtensionMap = Map<ComponentName, Set<ComponentExtension>>;

type Signature = {
  Args: string[] | undefined;
  Blocks: Map<string, string[]> | undefined;
  Element: string[] | undefined;
};

type SignatureMap = Map<ComponentName, Signature>;

type Options = {
  componentStructure: 'flat' | 'nested';
  projectRoot: string;
  src: string;
};

export type {
  CodemodOptions,
  ComponentExtension,
  ComponentName,
  Context,
  ExtensionMap,
  Options,
  Signature,
  SignatureMap,
  UnfilteredComponentExtension,
  UnfilteredExtensionMap,
};
