import { IProduct } from '../../shared';

export type CartActionsType =
  | {
      type: 'ADD_PRODUCT_TO_CART';
      payload: { composedId: string; product: IProduct; quantity: number };
    }
  | {
      type: 'ADD_PRODUCT_TO_CART_AT_INDEX';
      payload: {
        composedId: string;
        product: IProduct;
        quantity: number;
        index: number;
      };
    }
  | { type: 'REMOVE_PRODUCT_FROM_CART'; payload: IProduct['id'] }
  | {
      type: 'CHANGE_PRODUCT_QUANTITY';
      payload: { composedId: IProduct['id']; quantity: number };
    };
