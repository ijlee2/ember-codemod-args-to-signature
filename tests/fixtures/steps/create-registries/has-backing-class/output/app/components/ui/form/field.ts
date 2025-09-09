import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
}

export default class UiFormField extends Component<UiFormFieldSignature> {
  inputId = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormField;
    'ui/form/field': typeof UiFormField;
  }
}
