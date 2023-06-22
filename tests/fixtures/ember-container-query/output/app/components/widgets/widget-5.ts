import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget5Signature {
  Args: {};
}

const WidgetsWidget5Component =
  templateOnlyComponent<WidgetsWidget5Signature>();

export default WidgetsWidget5Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget5': typeof WidgetsWidget5Component;
    'widgets/widget-5': typeof WidgetsWidget5Component;
  }
}
