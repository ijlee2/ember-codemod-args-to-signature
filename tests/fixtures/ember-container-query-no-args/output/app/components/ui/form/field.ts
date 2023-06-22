import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class UiFormFieldComponent extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {
  inputId = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
    'ui/form/field': typeof UiFormFieldComponent;
  }
}
