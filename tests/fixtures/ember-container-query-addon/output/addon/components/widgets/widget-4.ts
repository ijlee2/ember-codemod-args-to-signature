import templateOnlyComponent from '@ember/component/template-only';

type WidgetsWidget4Args = {};

const WidgetsWidget4Component = templateOnlyComponent<WidgetsWidget4Args>();

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4': typeof WidgetsWidget4Component;
    'widgets/widget-4': typeof WidgetsWidget4Component;
  }
}
