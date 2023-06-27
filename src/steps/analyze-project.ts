import type { Context, Options } from '../types/index.js';
import {
  analyzeComponents,
  filterComponents,
  findComponents,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  let extensionMap = findComponents(options);
  extensionMap = filterComponents(extensionMap, options);

  const signatureMap = analyzeComponents(extensionMap, options);

  return {
    extensionMap,
    signatureMap,
  };
}
