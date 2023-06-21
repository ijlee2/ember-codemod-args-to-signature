import templateOnlyComponent from '@ember/component/template-only';

interface <%= entity.classifiedName %>Signature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const <%= entity.classifiedName %>Component =
  templateOnlyComponent<<%= entity.classifiedName %>Signature>();

export default <%= entity.classifiedName %>Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    '<%= entity.doubleColonizedName %>': typeof <%= entity.classifiedName %>Component;
    '<%= entity.name %>': typeof <%= entity.classifiedName %>Component;
  }
}
