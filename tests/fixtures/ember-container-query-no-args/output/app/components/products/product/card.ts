import templateOnlyComponent from '@ember/component/template-only';

interface ProductsProductCardSignature {
  Args: {
    product: unknown;
    redirectTo: unknown;
  };
  Element: HTMLElement;
}

const ProductsProductCardComponent = templateOnlyComponent<ProductsProductCardSignature>();

export default ProductsProductCardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
    'products/product/card': typeof ProductsProductCardComponent;
  }
}
