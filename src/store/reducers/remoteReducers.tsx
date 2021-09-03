import { ICategory, IProduct } from '../../shared';
import { ActionTypes } from '../actions';

type InitialDataStateType = {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
  error: string;
  isPending: boolean;
};

const initialDataState: InitialDataStateType = {
  categories: [{ name: 'all' }],
  currencies: [],
  products: [],
  error: '',
  isPending: true,
};

export const requestInitialDataReducer = (
  state: InitialDataStateType = initialDataState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'REQUEST_INITIAL_DATA_ERROR':
      return { ...state, error: action.payload };
    case 'REQUEST_INITIAL_DATA_PENDING':
      return { ...state };
    case 'REQUEST_INITIAL_DATA_SUCCESS':
      const { categories, products, currencies } = action.payload;
      return {
        ...state,
        categories: [...state.categories, ...categories],
        products,
        currencies,
        isPending: false,
      };
    default:
      return state;
  }
};
