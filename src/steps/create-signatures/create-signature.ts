import {
  getBaseComponent,
  type TransformedEntityName,
} from '../../utils/components.js';
import { passSignatureToBaseComponent } from './pass-signature-to-base-component.js';
import { updateConstructor } from './update-constructor.js';
import { updateReferences } from './update-references.js';

type Data = {
  entity: TransformedEntityName;
};

export function createSignature(file: string, data: Data): string {
  const { baseComponentName } = getBaseComponent(file);

  if (baseComponentName === undefined) {
    return file;
  }

  // eslint-disable-next-line prefer-const
  let { interfaceName, newFile } = passSignatureToBaseComponent(file, {
    baseComponentName,
    data,
  });

  newFile = updateConstructor(newFile, {
    data,
  });

  if (interfaceName === undefined) {
    return newFile;
  }

  return updateReferences(newFile, {
    data,
    interfaceName,
  });
}
