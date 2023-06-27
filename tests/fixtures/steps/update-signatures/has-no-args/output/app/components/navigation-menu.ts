import templateOnlyComponent from '@ember/component/template-only';

interface NavigationMenuSignature {
  Args: {};
  Element: HTMLElement;
}

const NavigationMenuComponent = templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenuComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenuComponent;
    'navigation-menu': typeof NavigationMenuComponent;
  }
}
