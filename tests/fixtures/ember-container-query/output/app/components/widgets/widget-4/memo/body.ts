import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

const Body = class extends Component<{
  cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
}> {}

export default Body;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
    'widgets/widget-4/memo/body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
