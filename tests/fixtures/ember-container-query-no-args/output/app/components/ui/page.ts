import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class UiPageComponent extends Component<UiPageSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
    'ui/page': typeof UiPageComponent;
  }
}
