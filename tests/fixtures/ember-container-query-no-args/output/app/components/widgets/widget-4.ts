import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget4Component = templateOnlyComponent();

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4': typeof WidgetsWidget4Component;
    'widgets/widget-4': typeof WidgetsWidget4Component;
  }
}
