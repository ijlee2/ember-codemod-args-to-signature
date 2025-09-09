import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-nested/input');
const outputProject = convertFixtureToJson('my-v1-app-nested/output');

export { inputProject, outputProject };
