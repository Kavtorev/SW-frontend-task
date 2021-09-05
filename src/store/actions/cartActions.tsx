import { IProduct } from '../../shared';

export type CartActionsType =
  | { type: 'ADD_PRODUCT_TO_CART'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT_FROM_CART'; payload: IProduct['id'] }
  | {
      type: 'CHANGE_PRODUCT_QUANTITY';
      payload: { productId: IProduct['id']; quantity: number };
    };
