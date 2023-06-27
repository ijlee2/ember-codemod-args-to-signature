import type { Context, Options } from '../types/index.js';
import {
  createSignatureMap,
  filterComponentEntities,
  findComponentEntities,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  let extensionMap = findComponentEntities(options);
  extensionMap = filterComponentEntities(extensionMap, options);

  const signatureMap = createSignatureMap(extensionMap, options);

  return {
    extensionMap,
    signatureMap,
  };
}
