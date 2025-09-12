import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v2-addon-javascript/input');
const outputProject = convertFixtureToJson('my-v2-addon-javascript/output');

export { inputProject, outputProject };
