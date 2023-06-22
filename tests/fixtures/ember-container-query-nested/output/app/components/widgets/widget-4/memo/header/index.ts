import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

const WidgetsWidget4MemoHeaderComponent = class FooComponent extends Component<{
  cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
}> {}

export default WidgetsWidget4MemoHeaderComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
