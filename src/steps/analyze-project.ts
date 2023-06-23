import type { Context, Options } from '../types/index.js';
import {
  filterComponentEntities,
  findComponentEntities,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  let entities = findComponentEntities(options);
  entities = filterComponentEntities(entities, options);

  return {
    entities,
  };
}
