export type UiActionsType =
  | { type: 'CLOSE_OR_OPEN_CART_POPPER' }
  | { type: 'CLOSE_OR_OPEN_CURRENCY_MENU' }
  | { type: 'SELECT_CURRENCY'; payload: string }
  | { type: 'SELECT_CATEGORY'; payload: string };
