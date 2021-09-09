export interface IPrice {
  currency: string;
  amount: number;
}

export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  prices: IPrice[];
  brand: string;
  attributes: IAttributeSet[];
}

export interface ICategory {
  name: string;
}

export interface IAttributeSet {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}

export interface IAttribute {
  displayValue: string;
  value: string;
  id: string;
}

export interface IAttributeMeta {
  attrId: IAttributeSet['id'];
  itemId: IAttribute['id'];
}
