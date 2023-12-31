import { action, get } from '@ember/object';
import Component from '@glimmer/component';

interface UiFormTextareaSignature {
  Args: {};
}

export default class UiFormTextareaComponent extends Component<UiFormTextareaSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    onUpdate({ key, value });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Textarea': typeof UiFormTextareaComponent;
    'ui/form/textarea': typeof UiFormTextareaComponent;
  }
}
