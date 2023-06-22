import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
  Blocks: {
    default: [];
  };
  Element: null;
}

class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
    'products/product/image': typeof ProductsProductImageComponent;
  }
}
