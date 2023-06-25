import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldSignature {
  Args: {};
}

export default class extends Component<UiFormFieldSignature> {
  inputId = guidFor(this);
}
