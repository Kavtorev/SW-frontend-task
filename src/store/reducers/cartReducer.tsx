import { IProduct } from '../../shared';
import { CartActionsType } from '../actions';

type InitialCartStateType = {
  products: IProduct[];
  mappedQuantities: { [productId: string]: number };
  total: number;
};

const initialDataState: InitialCartStateType = {
  products: [],
  mappedQuantities: {},
  total: 0,
};

export const cartRedcucer = (
  state: InitialCartStateType = initialDataState,
  action: CartActionsType
) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      if (action.payload.id in state.mappedQuantities) return state;
      return {
        ...state,
        products: state.products.concat(action.payload),
        mappedQuantities: {
          ...state.mappedQuantities,
          [action.payload.id]: 1,
        },
        total: state.total + 1,
      };
    case 'REMOVE_PRODUCT_FROM_CART':
      const mappedQuantities = { ...state.mappedQuantities };
      delete mappedQuantities[action.payload];
      return {
        ...state,
        products: state.products
          .concat([])
          .filter((product) => product.id !== action.payload),
        total: state.total - 1,
        mappedQuantities,
      };
    case 'CHANGE_PRODUCT_QUANTITY':
      const { productId, quantity } = action.payload;
      return {
        ...state,
        mappedQuantities: {
          ...state.mappedQuantities,
          [productId]: state.mappedQuantities[productId] + quantity,
        },
        total: state.total + quantity,
      };
    default:
      return state;
  }
};
