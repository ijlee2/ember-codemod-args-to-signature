import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldSignature {
  Args: {};
}

export default class UiFormFieldComponent extends Component<UiFormFieldSignature> {
  inputId = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
    'ui/form/field': typeof UiFormFieldComponent;
  }
}
