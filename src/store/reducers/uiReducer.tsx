import { UiActionsType } from '../actions';

type InitialStateType = {
  isCartPopperOpen: boolean;
  isCurrencyMenuOpen: boolean;
};

const initialState = {
  isCartPopperOpen: false,
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
    default:
      return state;
  }
};
