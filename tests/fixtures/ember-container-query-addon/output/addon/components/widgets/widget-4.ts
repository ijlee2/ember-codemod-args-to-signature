import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4Signature {
  Args: {};
}

const WidgetsWidget4Component = templateOnlyComponent<WidgetsWidget4Signature>();

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4': typeof WidgetsWidget4Component;
    'widgets/widget-4': typeof WidgetsWidget4Component;
  }
}
