import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
  Element: HTMLDivElement | HTMLImageElement;
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  isTestEnvironment = config.environment === 'test';
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
