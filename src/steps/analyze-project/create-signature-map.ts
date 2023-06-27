import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';

export function createSignatureMap(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-expect-error
  extensionMap: ExtensionMap,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-expect-error
  options: Options,
): SignatureMap {
  const signatureMap: SignatureMap = new Map();

  return signatureMap;
}
