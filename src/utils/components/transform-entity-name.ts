import { classify, doubleColonize } from '@codemod-utils/ember-cli-string';

export type TransformedEntityName = {
  classifiedName: string;
  doubleColonizedName: string;
  name: string;
};

export function transformEntityName(entityName: string): TransformedEntityName {
  return {
    classifiedName: classify(entityName),
    doubleColonizedName: doubleColonize(entityName),
    name: entityName,
  };
}
