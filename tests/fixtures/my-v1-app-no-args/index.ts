import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-no-args/input');
const outputProject = convertFixtureToJson('my-v1-app-no-args/output');

export { inputProject, outputProject };
