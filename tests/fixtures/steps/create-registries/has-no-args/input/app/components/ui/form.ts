import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiFormSignature {
  Args: {};
}

export default class UiFormComponent extends Component<UiFormSignature> {
  formId = guidFor(this);

  @tracked changeset = this.args.data ?? ({} as Record<string, any>);

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}
