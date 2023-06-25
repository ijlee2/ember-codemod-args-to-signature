import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
}

export default class extends Component<UiFormFieldSignature> {
  inputId = guidFor(this);
}
