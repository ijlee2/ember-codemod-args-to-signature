import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { convertToTypeScript } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-javascript.js';

test('steps | convert-to-typescript > my-v1-app-javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/convert-to-typescript/my-v1-app-javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/convert-to-typescript/my-v1-app-javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  convertToTypeScript(options);

  assertFixture(outputProject, codemodOptions);
});
