import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const WidgetsWidget4MemoComponent = templateOnlyComponent<WidgetsWidget4MemoSignature>();

export default WidgetsWidget4MemoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo': typeof WidgetsWidget4MemoComponent;
    'widgets/widget-4/memo': typeof WidgetsWidget4MemoComponent;
  }
}
