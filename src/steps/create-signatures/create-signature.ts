import type { TransformedEntityName } from '../../utils/files.js';
import { getBaseComponentName } from './get-base-component-name.js';
import { passSignatureToBaseComponent } from './pass-signature-to-base-component.js';
import { updateReferences } from './update-references.js';

type Data = {
  entity: TransformedEntityName;
};

export function createSignature(file: string, data: Data): string {
  const baseComponentName = getBaseComponentName(file);

  if (baseComponentName === undefined) {
    return file;
  }

  // eslint-disable-next-line prefer-const
  let { interfaceName, newFile } = passSignatureToBaseComponent(file, {
    baseComponentName,
    data,
  });

  if (interfaceName === undefined) {
    return newFile;
  }

  ({ newFile } = updateReferences(newFile, {
    data,
    interfaceName,
  }));

  return newFile;
}
