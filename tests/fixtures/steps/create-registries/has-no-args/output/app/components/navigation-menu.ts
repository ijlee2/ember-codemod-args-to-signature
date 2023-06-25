import templateOnlyComponent from '@ember/component/template-only';

const NavigationMenuComponent = templateOnlyComponent();

export default NavigationMenuComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenuComponent;
    'navigation-menu': typeof NavigationMenuComponent;
  }
}
