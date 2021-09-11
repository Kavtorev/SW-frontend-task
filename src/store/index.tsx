import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  uiReducer,
  categoryProductsReducer,
  initialDataReducer,
  productReducer,
  cartReducer,
  attributeReducer,
} from './reducers';
import { createLogger } from 'redux-logger';
import {
  requestInitialData,
  requestProductById,
  requestProductsByCategoryName,
} from './actions';
import {
  IProduct,
  IAttributeSet,
  IAttribute,
  ICategory,
  IAttributeMeta,
} from '../shared';

export const rootReducers = combineReducers({
  uiReducer,
  categoryProductsReducer,
  initialDataReducer,
  productReducer,
  cartRedcucer: cartReducer,
  attributeReducer,
});
const logger = createLogger();
export const store = createStore(rootReducers, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const mapState = (state: RootState) => ({
  // ui
  isCartPopperOpen: state.uiReducer.isCartPopperOpen,
  isCurrencyMenuOpen: state.uiReducer.isCurrencyMenuOpen,
  mappedProductImageCarouselIndexes:
    state.uiReducer.mappedProductImageCarouselIndexes,

  // remote
  // initial
  selectedCurrency: state.initialDataReducer.selectedCurrency,
  selectedCategory: state.initialDataReducer.selectedCategory,
  categories: state.initialDataReducer.categories,
  currencies: state.initialDataReducer.currencies,
  initialDataLoading: state.initialDataReducer.initialDataPending,
  initialDataError: state.initialDataReducer.initialDataError,

  // category
  fetchedProducts: state.categoryProductsReducer.products,
  categoryProductsLoading:
    state.categoryProductsReducer.categoryProductsPending,
  categoryProductsLoadingError:
    state.categoryProductsReducer.categoryProductsError,

  //product
  productLoading: state.productReducer.productPending,
  productError: state.productReducer.productError,
  fetchedProduct: state.productReducer.product,
  selectedGalleryImageSrc: state.productReducer.selectedGalleryImage,

  // cart
  cartProducts: {
    products: state.cartRedcucer.products,
    mappedQuantities: state.cartRedcucer.mappedQuantities,
    totalQuantity: state.cartRedcucer.total,
  },

  // attributes
  cartProductAttributeSelections:
    state.attributeReducer.cartProductAttributeSelections,
  localProductAttributeSelections:
    state.attributeReducer.localProductAttributeSelections,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setOpenCartPopper: (flag: boolean) =>
    dispatch({ type: 'SET_OPEN_CART_POPPER', payload: flag }),

  setOpenCurrencyMenu: (flag: boolean) =>
    dispatch({ type: 'SET_OPEN_CURRENCY_MENU', payload: flag }),

  closeAnyMenus: () => dispatch({ type: 'CLOSE_ANY_MENUS' }),

  handleImageCarouselStep: (
    composedId: string,
    step: number,
    carouselLength: number
  ) =>
    dispatch({
      type: 'IMAGE_CAROUSEL_MAKE_STEP',
      payload: { composedId, step, carouselLength },
    }),

  updateImageCarouselComposedId: (
    previousComposedId: string,
    composedId: string
  ) =>
    dispatch({
      type: 'UPDATE_IMAGE_CAROUSEL_COMPOSED_ID',
      payload: { previousComposedId, composedId },
    }),

  removeImageCarouselComposedId: (composedId: string) =>
    dispatch({
      type: 'REMOVE_IMAGE_CAROUSEL_COMPOSED_ID',
      payload: composedId,
    }),

  selectCurrency: (payload: string) =>
    dispatch({ type: 'SELECT_CURRENCY', payload }),

  selectCategory: (payload: string) =>
    dispatch({ type: 'SELECT_CATEGORY', payload }),

  fetchInitialData: () => requestInitialData(dispatch),

  fetchProductsByCategoryName: (categoryName: ICategory['name']) =>
    requestProductsByCategoryName(dispatch, categoryName),

  fetchProductById: (productId: IProduct['id']) =>
    requestProductById(dispatch, productId),

  selectGalleryImage: (imageSrc: string) =>
    dispatch({ type: 'SELECT_GALLERY_IMAGE', payload: imageSrc }),

  addProductToCart: (composedId: string, product: IProduct, quantity: number) =>
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: { composedId, product, quantity },
    }),

  addProductToCartAtIndex: (
    composedId: string,
    product: IProduct,
    quantity: number,
    index: number
  ) =>
    dispatch({
      type: 'ADD_PRODUCT_TO_CART_AT_INDEX',
      payload: { composedId, product, quantity, index },
    }),

  removeProductFromCart: (composedId: string) =>
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: composedId }),

  changeProductQuantity: (composedId: string, quantity: number) =>
    dispatch({
      type: 'CHANGE_PRODUCT_QUANTITY',
      payload: { composedId, quantity },
    }),

  selectLocalAttribute: (
    productId: IProduct['id'],
    attrId: IAttributeSet['id'],
    itemId: IAttribute['id']
  ) =>
    dispatch({
      type: 'SELECT_LOCAL',
      payload: { productId, meta: { attrId, itemId } },
    }),

  unSelectLocalAttribute: (
    productId: IProduct['id'],
    attrId: IAttributeSet['id']
  ) => dispatch({ type: 'UNSELECT_LOCAL', payload: { productId, attrId } }),

  setSelectedAttributes: (
    composedId: string,
    selectedAttributes: Array<IAttributeMeta>
  ) =>
    dispatch({
      type: 'SET_SELECTED_ATTRIBUTES',
      payload: { composedId, selectedAttributes },
    }),

  removeAllAttributeSelections: (composedId: IProduct['id']) =>
    dispatch({ type: 'REMOVE_ALL_ATTRIBUTE_SELECTIONS', payload: composedId }),
});

export const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
