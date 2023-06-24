import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query-no-args/input');
const outputProject = convertFixtureToJson('ember-container-query-no-args/output');

export { inputProject, outputProject };
