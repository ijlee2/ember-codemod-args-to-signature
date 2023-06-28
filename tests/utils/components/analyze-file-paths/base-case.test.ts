import { assert, test } from '@codemod-utils/tests';

import { analyzeFilePaths } from '../../../../src/utils/components.js';

test('utils | components | analyze-file-paths > base case', function () {
  const filePaths = [
    'navigation-menu.css',
    'navigation-menu.hbs',
    'navigation-menu.ts',
    'ui/form/information.css',
    'ui/form/information.hbs',
    'widgets/widget-5.hbs',
  ];

  assert.deepStrictEqual(
    analyzeFilePaths(filePaths),
    new Map([
      ['navigation-menu', new Set(['.css', '.hbs', '.ts'])],
      ['ui/form/information', new Set(['.css', '.hbs'])],
      ['widgets/widget-5', new Set(['.hbs'])],
    ]),
  );
});
