import Component from '@glimmer/component';

interface UiPageComponentArgs {
  title: string;
}

export default class UiPageComponent extends Component<UiPageComponentArgs> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
    'ui/page': typeof UiPageComponent;
  }
}
