import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {};
  Element: HTMLDivElement;
}

export default class UiPageComponent extends Component<UiPageSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
    'ui/page': typeof UiPageComponent;
  }
}
