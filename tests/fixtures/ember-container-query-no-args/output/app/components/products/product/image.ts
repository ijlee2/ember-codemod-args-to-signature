import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

class ProductsProductImage extends Component {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
    'products/product/image': typeof ProductsProductImageComponent;
  }
}
