import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

class ProductsProductImage extends Component {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;
