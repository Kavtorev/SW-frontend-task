import { ActionTypes } from '../actions';

type InitialStateType = {
  isCartPopperOpen: boolean;
  selectedCurrency: string;
  selectedCategory: string;
};

const initialState = {
  isCartPopperOpen: false,
  selectedCurrency: 'USD',
  selectedCategory: 'all',
};

export const uiReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'CLOSE_OR_OPEN_CART_POPPER':
      return { ...state, isCartPopperOpen: !state.isCartPopperOpen };
    case 'SELECT_CURRENCY':
      return { ...state, selectedCurrency: action.payload };
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
