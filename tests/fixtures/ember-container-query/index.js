import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('ember-container-query/input');
const outputProject = convertFixtureToJson('ember-container-query/output');

export { inputProject, outputProject };
