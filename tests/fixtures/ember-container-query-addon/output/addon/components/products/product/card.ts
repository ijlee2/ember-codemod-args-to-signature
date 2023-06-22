import templateOnlyComponent from '@ember/component/template-only';

import type { Product } from '../../../data/products';

const Component = templateOnlyComponent<{
  product: Product;
  redirectTo?: string;
}>();

export default Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
    'products/product/card': typeof ProductsProductCardComponent;
  }
}
