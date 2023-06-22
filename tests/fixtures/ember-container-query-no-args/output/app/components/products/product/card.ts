import templateOnlyComponent from '@ember/component/template-only';

const ProductsProductCardComponent = templateOnlyComponent();

export default ProductsProductCardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
    'products/product/card': typeof ProductsProductCardComponent;
  }
}
