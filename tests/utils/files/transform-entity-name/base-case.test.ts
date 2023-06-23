import { assert, test } from '@codemod-utils/tests';

import { transformEntityName } from '../../../../src/utils/files.js';

test('utils | files | transform-entity-name > base case', function () {
  assert.deepStrictEqual(transformEntityName('navigation-menu'), {
    classifiedName: 'NavigationMenu',
    doubleColonizedName: 'NavigationMenu',
    name: 'navigation-menu',
  });

  assert.deepStrictEqual(transformEntityName('widgets/widget-3'), {
    classifiedName: 'WidgetsWidget3',
    doubleColonizedName: 'Widgets::Widget3',
    name: 'widgets/widget-3',
  });
});
