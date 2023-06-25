import Component from '@glimmer/component';

const WidgetsWidget4MemoBodyComponent = class extends Component {}

export default WidgetsWidget4MemoBodyComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
    'widgets/widget-4/memo/body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
