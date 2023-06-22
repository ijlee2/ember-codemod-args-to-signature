import Component from '@glimmer/component';

const Header = class FooComponent extends Component {}

export default Header;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
