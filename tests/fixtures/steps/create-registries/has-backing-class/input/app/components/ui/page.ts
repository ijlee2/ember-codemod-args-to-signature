import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: string;
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {}
