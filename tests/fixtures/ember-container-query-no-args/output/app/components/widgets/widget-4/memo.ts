import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget4MemoComponent = templateOnlyComponent<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}>();

export default WidgetsWidget4MemoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo': typeof WidgetsWidget4MemoComponent;
    'widgets/widget-4/memo': typeof WidgetsWidget4MemoComponent;
  }
}
