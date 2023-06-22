import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ItemSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const WidgetsWidget1ItemComponent =
  templateOnlyComponent<WidgetsWidget1ItemSignature>();

export default WidgetsWidget1ItemComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget1::Item': typeof WidgetsWidget1ItemComponent;
    'widgets/widget-1/item': typeof WidgetsWidget1ItemComponent;
  }
}
