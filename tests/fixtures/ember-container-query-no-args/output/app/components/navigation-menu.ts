import templateOnlyComponent from '@ember/component/template-only';

interface NavigationMenuSignature {
  Args: {
    menuItems: unknown;
    name: unknown;
  };
  Element: HTMLElement;
}

const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenu;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenu;
    'navigation-menu': typeof NavigationMenu;
  }
}
