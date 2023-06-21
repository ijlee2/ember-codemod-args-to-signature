import {
  analyzeProject,
  createOptions,
  createRegistries,
  createSignatures,
  createTemplateOnlyComponents,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  // Prepare for migration
  const context = analyzeProject(options);

  // Update components
  createTemplateOnlyComponents(context, options);
  createSignatures(context, options);
  createRegistries(context, options);
}
