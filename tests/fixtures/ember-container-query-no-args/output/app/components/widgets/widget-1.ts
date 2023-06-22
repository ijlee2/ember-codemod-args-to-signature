import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget1Component = templateOnlyComponent<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}>();

export default WidgetsWidget1Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget1': typeof WidgetsWidget1Component;
    'widgets/widget-1': typeof WidgetsWidget1Component;
  }
}
