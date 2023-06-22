import templateOnlyComponent from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

interface Args {
  menuItems: MenuItem[];
  name?: string;
}

const NavigationMenu = templateOnlyComponent<Args>();

export default NavigationMenu;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'NavigationMenu': typeof NavigationMenuComponent;
    'navigation-menu': typeof NavigationMenuComponent;
  }
}
