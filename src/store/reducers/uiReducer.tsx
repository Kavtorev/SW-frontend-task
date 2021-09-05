import { UiActionsType } from '../actions';

type InitialStateType = {
  isCartPopperOpen: boolean;
  selectedCurrency: string;
  selectedCategory: string;
  isCurrencyMenuOpen: boolean;
};

const initialState = {
  isCartPopperOpen: false,
  selectedCurrency: 'USD',
  selectedCategory: 'all',
  isCurrencyMenuOpen: false,
};

export const uiReducer = (
  state: InitialStateType = initialState,
  action: UiActionsType
) => {
  switch (action.type) {
    case 'CLOSE_OR_OPEN_CART_POPPER':
      return { ...state, isCartPopperOpen: !state.isCartPopperOpen };
    case 'CLOSE_OR_OPEN_CURRENCY_MENU':
      return { ...state, isCurrencyMenuOpen: !state.isCurrencyMenuOpen };
    case 'SELECT_CURRENCY':
      return { ...state, selectedCurrency: action.payload };
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
