import type { Context, Options } from '../types/index.js';
import {
  analyzeComponents,
  filterComponents,
  findComponents,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  const unfilteredExtensionMap = findComponents(options);
  const extensionMap = filterComponents(unfilteredExtensionMap, options);
  const signatureMap = analyzeComponents(extensionMap, options);

  return {
    extensionMap,
    signatureMap,
  };
}
