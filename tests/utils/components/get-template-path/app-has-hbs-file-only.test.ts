import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getTemplatePath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs']);

  const options: Options = {
    componentStructure: 'flat',
    projectRoot: 'tmp/my-v1-app',
    src: 'app/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-class-path > app (has-hbs-file-only)', function () {
  assert.strictEqual(getPath('index'), 'app/components/index.hbs');

  assert.strictEqual(
    getPath('navigation-menu'),
    'app/components/navigation-menu.hbs',
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    'app/components/widgets/widget-3.hbs',
  );
});
