export type UiActionsType =
  | { type: 'CLOSE_OR_OPEN_CART_POPPER' }
  | { type: 'CLOSE_OR_OPEN_CURRENCY_MENU' }
  | { type: 'SELECT_CURRENCY'; payload: string }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | {
      type: 'IMAGE_CAROUSEL_MAKE_STEP';
      payload: { composedId: string; step: number; carouselLength: number };
    }
  | { type: 'REMOVE_IMAGE_CAROUSEL_COMPOSED_ID'; payload: string }
  | {
      type: 'UPDATE_IMAGE_CAROUSEL_COMPOSED_ID';
      payload: { previousComposedId: string; composedId: string };
    };
