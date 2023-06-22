import templateOnlyComponent from '@ember/component/template-only';

const NavigationMenu = templateOnlyComponent();

export default NavigationMenu;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenuComponent;
    'navigation-menu': typeof NavigationMenuComponent;
  }
}
