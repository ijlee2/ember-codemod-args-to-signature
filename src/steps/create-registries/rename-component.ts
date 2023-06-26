import {
  getBaseComponent,
  type TransformedEntityName,
} from '../../utils/components.js';
import { passComponentNameToBaseComponent } from './pass-component-name-to-base-component.js';
import { updateReferences } from './update-references.js';

type Data = {
  entity: TransformedEntityName;
};

export function renameComponent(file: string, data: Data): string {
  const { baseComponentName } = getBaseComponent(file);

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
