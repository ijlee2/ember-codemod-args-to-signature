import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-addon/input');
const outputProject = convertFixtureToJson('ember-container-query-addon/output');

export { inputProject, outputProject };
