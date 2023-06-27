import {
  analyzeProject,
  createOptions,
  createRegistries,
  createSignatures,
  createTemplateOnlyComponents,
  updateSignatures,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  // Prepare for migration
  const context = analyzeProject(options);

  // Update components without backing class
  createTemplateOnlyComponents(context, options);

  // Update components with backing class
  createSignatures(context, options);
  createRegistries(context, options);

  // Fill out signatures
  updateSignatures(context, options);
}
