import { ICategory, IProduct } from '../../shared';
import { GET_INITIAL_DATA, GET_PRODUCTS_BY_CATEGORY_NAME } from '../../graphql';
import { client } from '../../graphql';
import { Dispatch } from 'react';

interface RemoteData {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
}

export type RemoteActionsType =
  | {
      type: 'REQUEST_INITIAL_DATA_SUCCESS';
      payload: {
        categories: RemoteData['categories'];
        currencies: RemoteData['currencies'];
      };
    }
  | { type: 'REQUEST_INITIAL_DATA_ERROR'; payload: string }
  | { type: 'REQUEST_INITIAL_DATA_PENDING' }
  | { type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_PENDING' }
  | {
      type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_SUCCESS';
      payload: { products: IProduct[] };
    }
  | { type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_ERROR'; payload: string }
  | { type: 'SELECT_CURRENCY'; payload: string }
  | { type: 'SELECT_CATEGORY'; payload: string };

export const requestInitialData = async (
  dispatch: Dispatch<RemoteActionsType>
) => {
  dispatch({ type: 'REQUEST_INITIAL_DATA_PENDING' });
  try {
    const { categories, currencies } = (
      await client.query({
        query: GET_INITIAL_DATA,
      })
    ).data;
    dispatch({
      type: 'REQUEST_INITIAL_DATA_SUCCESS',
      payload: {
        categories,
        currencies,
      },
    });
  } catch (error) {
    dispatch({ type: 'REQUEST_INITIAL_DATA_ERROR', payload: 'error' });
  }
};

export const requestProductsByCategoryName = async (
  dispatch: Dispatch<RemoteActionsType>,
  categoryName: ICategory['name']
) => {
  dispatch({ type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_PENDING' });
  try {
    const {
      category: { products },
    } = (
      await client.query({
        query: GET_PRODUCTS_BY_CATEGORY_NAME,
        variables: {
          categoryName,
        },
      })
    ).data;

    dispatch({
      type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_SUCCESS',
      payload: { products },
    });
  } catch (error) {
    console.log('fetch products by category name error:', error);
    dispatch({
      type: 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_ERROR',
      payload: 'error',
    });
  }
};
