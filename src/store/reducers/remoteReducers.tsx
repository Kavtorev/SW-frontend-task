import { ICategory, IProduct } from '../../shared';
import { RemoteActionsType } from '../actions';

type InitialDataStateType = {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
  error: string;
  isInitialDataPending: boolean;
  selectedCurrency: string;
  selectedCategory: string;
  isCategoryProductsDataLoading: boolean;
};

const initialDataState: InitialDataStateType = {
  categories: [{ name: 'all' }],
  currencies: [],
  products: [],
  error: '',
  isInitialDataPending: false,
  isCategoryProductsDataLoading: false,
  selectedCurrency: 'USD',
  selectedCategory: 'all',
};

export const requestRemoteDataReducer = (
  state: InitialDataStateType = initialDataState,
  action: RemoteActionsType
) => {
  switch (action.type) {
    case 'REQUEST_INITIAL_DATA_ERROR':
      return { ...state, error: action.payload, isInitialDataPending: false };
    case 'REQUEST_INITIAL_DATA_PENDING':
      return { ...state, isInitialDataPending: true };
    case 'REQUEST_INITIAL_DATA_SUCCESS':
      const { categories, currencies } = action.payload;
      return {
        ...state,
        categories: [...state.categories, ...categories],
        currencies,
        isInitialDataPending: false,
      };
    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_ERROR':
      return {
        ...state,
        error: action.payload,
        isCategoryProductsDataLoading: false,
      };
    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_PENDING':
      return { ...state, isCategoryProductsDataLoading: true };
    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_SUCCESS':
      const { products } = action.payload;
      return {
        ...state,
        products,
        isCategoryProductsDataLoading: false,
      };
    case 'SELECT_CURRENCY':
      return { ...state, selectedCurrency: action.payload };
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
