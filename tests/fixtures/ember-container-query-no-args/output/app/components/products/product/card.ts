import templateOnlyComponent from '@ember/component/template-only';

interface ProductsProductCardSignature {
  Args: {
    product: unknown;
    redirectTo: unknown;
  };
  Element: HTMLElement;
}

const ProductsProductCard = templateOnlyComponent<ProductsProductCardSignature>();

export default ProductsProductCard;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCard;
    'products/product/card': typeof ProductsProductCard;
  }
}
