import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-addon-template-tag/input');
const outputProject = convertFixtureToJson('my-v2-addon-template-tag/output');

export { inputProject, outputProject };
