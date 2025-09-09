import templateOnlyComponent from '@ember/component/template-only';

import type { Product } from '../../../data/products';

const Component = templateOnlyComponent<{
  product: Product;
  redirectTo?: string;
}>();

export default Component;
