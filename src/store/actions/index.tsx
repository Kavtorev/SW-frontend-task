import { Dispatch } from 'react';
import { IAttribute, IAttributeSet, ICategory, IProduct } from '../../shared';
import { client } from '../../graphql';
import { GET_INITIAL_DATA } from '../../graphql/queries';

interface InitialData {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
}

export type ActionTypes =
  | { type: 'CLOSE_OR_OPEN_CART_POPPER' }
  | { type: 'CLOSE_OR_OPEN_CURRENCY_MENU' }
  | { type: 'SELECT_CURRENCY'; payload: string }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | {
      type: 'REQUEST_INITIAL_DATA_SUCCESS';
      payload: InitialData;
    }
  | { type: 'REQUEST_INITIAL_DATA_ERROR'; payload: string }
  | { type: 'REQUEST_INITIAL_DATA_PENDING' }
  | { type: 'ADD_PRODUCT_TO_CART'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT_FROM_CART'; payload: IProduct['id'] }
  | {
      type: 'CHANGE_PRODUCT_QUANTITY';
      payload: { productId: IProduct['id']; quantity: number };
    }
  | {
      type: 'SELECT_ATTRIBUTE';
      payload: {
        productId: IProduct['id'];
        meta: { attrId: IAttributeSet['id']; itemId: IAttribute['id'] };
      };
    }
  | {
      type: 'UNSELECT_ATTRIBUTE';
      payload: {
        productId: IProduct['id'];
        attrId: IAttributeSet['id'];
      };
    };

export const requestInitialData = async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: 'REQUEST_INITIAL_DATA_PENDING' });
  try {
    const {
      categories,
      currencies,
      category: { products },
    } = (
      await client.query({
        query: GET_INITIAL_DATA,
      })
    ).data;
    dispatch({
      type: 'REQUEST_INITIAL_DATA_SUCCESS',
      payload: {
        categories,
        currencies,
        products,
      },
    });
  } catch (error) {
    dispatch({ type: 'REQUEST_INITIAL_DATA_ERROR', payload: 'error' });
  }
};
