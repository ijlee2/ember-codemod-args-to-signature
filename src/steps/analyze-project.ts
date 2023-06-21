import type { Context, Options } from '../types/index.js';
import { findComponentEntities } from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  const entities = findComponentEntities(options);

  return {
    entities,
  };
}
