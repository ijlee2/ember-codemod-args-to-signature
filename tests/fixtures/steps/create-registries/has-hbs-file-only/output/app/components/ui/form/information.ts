import templateOnlyComponent from '@ember/component/template-only';

interface UiFormInformationSignature {
  Args: {};
}

const UiFormInformationComponent =
  templateOnlyComponent<UiFormInformationSignature>();

export default UiFormInformationComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformationComponent;
    'ui/form/information': typeof UiFormInformationComponent;
  }
}
