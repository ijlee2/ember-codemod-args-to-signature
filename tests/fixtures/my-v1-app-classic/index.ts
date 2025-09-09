import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-classic/input');
const outputProject = convertFixtureToJson('my-v1-app-classic/output');

export { inputProject, outputProject };
