import Component from '@glimmer/component';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures: unknown;
  };
}

const WidgetsWidget4MemoBodyComponent = class extends Component<WidgetsWidget4MemoBodySignature> {}

export default WidgetsWidget4MemoBodyComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
    'widgets/widget-4/memo/body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
