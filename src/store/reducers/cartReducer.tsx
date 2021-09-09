import { IProduct } from '../../shared';
import { CartActionsType } from '../actions';

type InitialCartStateType = {
  products: { [composedId: string]: IProduct };
  mappedQuantities: { [composedId: string]: number };
  total: number;
};

const initialDataState: InitialCartStateType = {
  products: {},
  mappedQuantities: {},
  total: 0,
};

export const cartReducer = (
  state: InitialCartStateType = initialDataState,
  action: CartActionsType
) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const { composedId, product, quantity } = action.payload;
      if (composedId in state.mappedQuantities) return state;
      return {
        ...state,
        products: { ...state.products, [composedId]: product },
        mappedQuantities: {
          ...state.mappedQuantities,
          [composedId]: quantity,
        },
        total: state.total + quantity,
      };
    }
    case 'REMOVE_PRODUCT_FROM_CART': {
      const mappedQuantities = { ...state.mappedQuantities };
      const productQuantity = mappedQuantities[action.payload];
      delete mappedQuantities[action.payload];

      const products = { ...state.products };
      delete products[action.payload];

      return {
        ...state,
        products,
        total: state.total - productQuantity,
        mappedQuantities,
      };
    }
    case 'CHANGE_PRODUCT_QUANTITY': {
      const { composedId, quantity } = action.payload;
      return {
        ...state,
        mappedQuantities: {
          ...state.mappedQuantities,
          [composedId]: state.mappedQuantities[composedId] + quantity,
        },
        total: state.total + quantity,
      };
    }
    default:
      return state;
  }
};
