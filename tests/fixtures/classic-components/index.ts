import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('classic-components/input');
const outputProject = convertFixtureToJson('classic-components/output');

export { inputProject, outputProject };
