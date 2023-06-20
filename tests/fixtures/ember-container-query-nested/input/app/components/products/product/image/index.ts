import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageArgs {
  src: string;
}

class ProductsProductImage extends Component<ProductsProductImageArgs> {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;
