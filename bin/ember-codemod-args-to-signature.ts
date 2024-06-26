#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-args-to-signature';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('component-structure', {
    choices: ['flat', 'nested'] as const,
    default: 'flat',
    describe: 'Component structure (how your components are colocated)',
    type: 'string',
  })
  .option('src', {
    demandOption: true,
    describe: 'Location of the components (e.g. app/components)',
    type: 'string',
  })
  .option('root', {
    describe: 'Location of your Ember project',
    type: 'string',
  })
  .parseSync();

const codemodOptions: CodemodOptions = {
  componentStructure: argv[
    'component-structure'
  ] as CodemodOptions['componentStructure'],
  projectRoot: argv['root'] ?? process.cwd(),
  src: argv['src'],
};

runCodemod(codemodOptions);
