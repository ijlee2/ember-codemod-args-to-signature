import type { Context, Options } from '../types/index.js';
import {
  filterComponentEntities,
  findArguments,
  findBlocks,
  findComponentEntities,
  findElement,
} from './analyze-project/index.js';

export function analyzeProject(options: Options): Context {
  let entities = findComponentEntities(options);
  entities = filterComponentEntities(entities, options);

  const signature = {
    Args: findArguments(options),
    Blocks: findBlocks(options),
    Element: findElement(options),
  };

  return {
    entities,
    signature,
  };
}
