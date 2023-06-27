import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoActionsSignature {
  Args: {};
}

const WidgetsWidget4MemoActionsComponent = templateOnlyComponent<WidgetsWidget4MemoActionsSignature>();

export default WidgetsWidget4MemoActionsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
    'widgets/widget-4/memo/actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
