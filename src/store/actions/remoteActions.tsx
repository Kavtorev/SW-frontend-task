import { ICategory, IProduct } from '../../shared';
import { GET_INITIAL_DATA } from '../../graphql';
import { client } from '../../graphql';
import { Dispatch } from 'react';

interface InitialData {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
}

export type RemoteActionsType =
  | {
      type: 'REQUEST_INITIAL_DATA_SUCCESS';
      payload: InitialData;
    }
  | { type: 'REQUEST_INITIAL_DATA_ERROR'; payload: string }
  | { type: 'REQUEST_INITIAL_DATA_PENDING' };

export const requestInitialData = async (
  dispatch: Dispatch<RemoteActionsType>
) => {
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
