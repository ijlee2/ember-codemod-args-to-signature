import templateOnlyComponent from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenu;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenu;
    'navigation-menu': typeof NavigationMenu;
  }
}
