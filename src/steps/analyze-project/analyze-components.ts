import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';
import { findArguments } from './find-arguments.js';
import { findBlocks } from './find-blocks.js';
import { findElement } from './find-element.js';

export function analyzeComponents(
  extensionMap: ExtensionMap,
  options: Options,
): SignatureMap {
  const signatureMap: SignatureMap = new Map();

  for (const [entityName, _extensions] of extensionMap) {
    const Args = findArguments(options);
    const Blocks = findBlocks(options);
    const Element = findElement(options);

    signatureMap.set(entityName, {
      Args,
      Blocks,
      Element,
    });
  }

  return signatureMap;
}
