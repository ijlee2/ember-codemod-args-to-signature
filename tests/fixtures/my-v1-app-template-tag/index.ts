import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-template-tag/input');
const outputProject = convertFixtureToJson('my-v1-app-template-tag/output');

export { inputProject, outputProject };
