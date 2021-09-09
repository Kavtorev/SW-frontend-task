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

    case 'ADD_PRODUCT_TO_CART_AT_INDEX': {
      const { composedId, index, product, quantity } = action.payload;
      if (composedId in state.mappedQuantities) return state;

      const enumerable = Object.entries(state.products);
      enumerable.splice(index, 0, [composedId, product]);
      const products = Object.fromEntries(enumerable);

      return {
        ...state,
        products: { ...products },
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
