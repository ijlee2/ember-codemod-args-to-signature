import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPage extends Component<UiPageSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPage;
    'ui/page': typeof UiPage;
  }
}
