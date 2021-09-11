import { ICategory, IProduct } from '../../shared';
import { RemoteActionsType } from '../actions';

type RemoteStateType = {
  categories: ICategory[];
  currencies: string[];
  products: IProduct[];
  product: IProduct;

  initialDataError: string;
  initialDataPending: boolean;

  productError: string;
  productPending: boolean;
  selectedGalleryImage: string;

  categoryProductsError: string;
  categoryProductsPending: boolean;

  selectedCurrency: string;
  selectedCategory: string;
};

const RemoteState: RemoteStateType = {
  categories: [{ name: 'all' }],
  currencies: [],
  products: [],
  product: {
    id: '',
    name: '',
    inStock: false,
    gallery: [],
    description: '',
    category: '',
    prices: [],
    brand: '',
    attributes: [],
  },

  initialDataError: '',
  initialDataPending: false,

  productError: '',
  productPending: false,
  selectedGalleryImage: '',

  categoryProductsError: '',
  categoryProductsPending: false,

  selectedCurrency: 'USD',
  selectedCategory: 'all',
};

export const initialDataReducer = (
  state: RemoteStateType = RemoteState,
  action: RemoteActionsType
) => {
  switch (action.type) {
    case 'REQUEST_INITIAL_DATA_PENDING':
      return { ...state, initialDataPending: true, initialDataError: '' };

    case 'REQUEST_INITIAL_DATA_ERROR':
      return {
        ...state,
        initialDataPending: false,
        initialDataError: action.payload,
      };

    case 'REQUEST_INITIAL_DATA_SUCCESS':
      const { categories, currencies } = action.payload;
      return {
        ...state,
        initialDataPending: false,
        categories: [...state.categories, ...categories],
        currencies,
      };

    case 'SELECT_CURRENCY':
      return { ...state, selectedCurrency: action.payload };
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
};

export const categoryProductsReducer = (
  state: RemoteStateType = RemoteState,
  action: RemoteActionsType
) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_PENDING':
      return {
        ...state,
        categoryProductsPending: true,
        categoryProductsError: '',
      };

    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_ERROR':
      return {
        ...state,
        categoryProductsPending: false,
        categoryProductsError: action.payload,
      };

    case 'REQUEST_PRODUCTS_BY_CATEGORY_NAME_SUCCESS':
      const { products } = action.payload;
      return {
        ...state,
        categoryProductsPending: false,
        products,
      };

    default:
      return state;
  }
};

export const productReducer = (
  state: RemoteStateType = RemoteState,
  action: RemoteActionsType
) => {
  switch (action.type) {
    case 'REQUEST_PRODUCT_BY_ID_PENDING':
      return { ...state, productPending: true, productError: '' };

    case 'REQUEST_PRODUCT_BY_ID_ERROR':
      return { ...state, productPending: false, productError: action.payload };

    case 'REQUEST_PRODUCT_BY_ID_SUCCESS': {
      const { product } = action.payload;
      return {
        ...state,
        productPending: false,
        product,
        selectedGalleryImage: product.gallery[0],
      };
    }

    case 'SELECT_GALLERY_IMAGE': {
      return { ...state, selectedGalleryImage: action.payload };
    }

    default:
      return state;
  }
};
