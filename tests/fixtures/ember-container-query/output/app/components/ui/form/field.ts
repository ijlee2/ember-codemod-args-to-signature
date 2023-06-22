import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldComponentArgs {
  errorMessage?: string;
  isInline?: boolean;
  isWide?: boolean;
}

export default class UiFormFieldComponent extends Component<UiFormFieldComponentArgs> {
  inputId = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
    'ui/form/field': typeof UiFormFieldComponent;
  }
}
