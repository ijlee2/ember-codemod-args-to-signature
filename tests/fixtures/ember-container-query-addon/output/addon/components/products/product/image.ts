import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageArgs {
  src: string;
}

class ProductsProductImage extends Component<ProductsProductImageArgs> {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
    'products/product/image': typeof ProductsProductImageComponent;
  }
}
