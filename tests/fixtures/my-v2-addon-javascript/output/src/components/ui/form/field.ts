import templateOnlyComponent from '@ember/component/template-only';

interface UiFormFieldSignature {
  Args: {
    errorMessage: unknown;
    isInline: unknown;
    isWide: unknown;
  };
  Blocks: {
    field: [unknown];
    label: [unknown];
  };
}

const UiFormField =
  templateOnlyComponent<UiFormFieldSignature>();

export default UiFormField;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormField;
    'ui/form/field': typeof UiFormField;
  }
}
