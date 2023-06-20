/*
  This is not a component.
*/
export type Concert = {
  date: string;
  images: Image[];
  location: {
    city: string;
    state: string;
  };
  name: string;
};

export type Image = {
  metadata: {
    height: number;
    width: number;
  };
  url: string;
};

export type Product = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  seller: string;
  shortDescription: string;
};

export type Revenue = {
  Format: string;
  Revenue: number;
  'Revenue (Inflation Adjusted)': number;
  Units: number | undefined;
  Year: number;
};
