import type { TransformedEntityName } from '../../utils/files.js';
import { getBaseComponentName } from './get-base-component-name.js';
import { passComponentNameToBaseComponent } from './pass-component-name-to-base-component.js';
import { updateReferences } from './update-references.js';

type Data = {
  entity: TransformedEntityName;
};

export function renameComponent(file: string, data: Data): string {
  const baseComponentName = getBaseComponentName(file);

  if (baseComponentName === undefined) {
    return file;
  }

  // eslint-disable-next-line prefer-const
  let { componentName, newFile } = passComponentNameToBaseComponent(file, {
    baseComponentName,
    data,
  });

  ({ newFile } = updateReferences(newFile, {
    baseComponentName,
    componentName,
    data,
  }));

  return newFile;
}
