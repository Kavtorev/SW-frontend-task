import { UiActionsType } from '../actions';

type InitialStateType = {
  isCartPopperOpen: boolean;
  isCurrencyMenuOpen: boolean;
  mappedProductImageCarouselIndexes: { [composedId: string]: number };
};

const initialState = {
  isCartPopperOpen: false,
  isCurrencyMenuOpen: false,
  mappedProductImageCarouselIndexes: {},
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
    case 'IMAGE_CAROUSEL_MAKE_STEP':
      const { composedId, carouselLength, step } = action.payload;
      const len = carouselLength;

      const previousIndex =
        state.mappedProductImageCarouselIndexes[composedId] || 0;

      if (step >= 0) {
        return {
          ...state,
          mappedProductImageCarouselIndexes: {
            ...state.mappedProductImageCarouselIndexes,
            [composedId]: (previousIndex + 1) % len,
          },
        };
      }

      return {
        ...state,
        mappedProductImageCarouselIndexes: {
          ...state.mappedProductImageCarouselIndexes,
          [composedId]: (previousIndex - 1 + len) % len,
        },
      };

    case 'REMOVE_IMAGE_CAROUSEL_COMPOSED_ID':
      const shallowCopiedState = { ...state };
      if (
        action.payload in shallowCopiedState.mappedProductImageCarouselIndexes
      ) {
        delete shallowCopiedState.mappedProductImageCarouselIndexes[
          action.payload
        ];
        return shallowCopiedState;
      }

      return state;

    case 'UPDATE_IMAGE_CAROUSEL_COMPOSED_ID': {
      const { previousComposedId, composedId } = action.payload;
      if (!(previousComposedId in state.mappedProductImageCarouselIndexes))
        return state;

      const currentIndex =
        state.mappedProductImageCarouselIndexes[previousComposedId];

      return {
        ...state,
        mappedProductImageCarouselIndexes: {
          ...state.mappedProductImageCarouselIndexes,
          [composedId]: currentIndex,
        },
      };
    }
    default:
      return state;
  }
};
