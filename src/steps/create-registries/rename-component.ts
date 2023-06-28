import {
  getBaseComponent,
  type TransformedEntityName,
} from '../../utils/components.js';
import {
  passComponentNameToBaseComponent,
  updateReferences,
} from './rename-component/index.js';

type Data = {
  entity: TransformedEntityName;
};

export function renameComponent(file: string, data: Data): string {
  const { baseComponentName } = getBaseComponent(file);

  if (baseComponentName === undefined) {
    return file;
  }

  const { componentName, newFile } = passComponentNameToBaseComponent(file, {
    baseComponentName,
    data,
  });

  return updateReferences(newFile, {
    baseComponentName,
    componentName,
    data,
  });
}
