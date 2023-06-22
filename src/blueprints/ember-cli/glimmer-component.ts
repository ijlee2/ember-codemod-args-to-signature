import Component from '@glimmer/component';

interface <%= entity.classifiedName %>Signature {
  Args: {};
}

export default class <%= entity.classifiedName %>Component extends Component<<%= entity.classifiedName %>Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    '<%= entity.doubleColonizedName %>': typeof <%= entity.classifiedName %>Component;
    '<%= entity.name %>': typeof <%= entity.classifiedName %>Component;
  }
}
