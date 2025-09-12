import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-javascript/input');
const outputProject = convertFixtureToJson('my-v1-app-javascript/output');

export { inputProject, outputProject };
