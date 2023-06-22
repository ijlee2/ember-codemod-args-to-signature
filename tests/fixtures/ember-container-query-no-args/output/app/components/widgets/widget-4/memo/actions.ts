import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget4MemoActionsComponent = templateOnlyComponent();

export default WidgetsWidget4MemoActionsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
    'widgets/widget-4/memo/actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
