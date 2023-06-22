import { action, get } from '@ember/object';
import Component from '@glimmer/component';

export default class UiFormInputComponent extends Component {
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

  get type(): string {
    return this.args.type ?? 'text';
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
    'Ui::Form::Input': typeof UiFormInputComponent;
    'ui/form/input': typeof UiFormInputComponent;
  }
}
