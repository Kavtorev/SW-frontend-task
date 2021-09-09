import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  uiReducer,
  requestRemoteDataReducer,
  cartReducer,
  attributeReducer,
} from './reducers';
import { createLogger } from 'redux-logger';
import { requestInitialData, requestProductsByCategoryName } from './actions';
import {
  IProduct,
  IAttributeSet,
  IAttribute,
  ICategory,
  IAttributeMeta,
} from '../shared';

export const rootReducers = combineReducers({
  uiReducer,
  requestRemoteDataReducer,
  cartRedcucer: cartReducer,
  attributeReducer,
});
const logger = createLogger();
export const store = createStore(rootReducers, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const mapState = (state: RootState) => ({
  isCartPopperOpen: state.uiReducer.isCartPopperOpen,
  isCurrencyMenuOpen: state.uiReducer.isCurrencyMenuOpen,
  selectedCurrency: state.requestRemoteDataReducer.selectedCurrency,
  selectedCategory: state.requestRemoteDataReducer.selectedCategory,
  categories: state.requestRemoteDataReducer.categories,
  currencies: state.requestRemoteDataReducer.currencies,
  initialDataLoading: state.requestRemoteDataReducer.isInitialDataPending,
  categoryProductsDataLoading:
    state.requestRemoteDataReducer.isCategoryProductsDataLoading,
  initialDataError: state.requestRemoteDataReducer.error,
  cartProducts: {
    products: state.cartRedcucer.products,
    mappedQuantities: state.cartRedcucer.mappedQuantities,
    totalQuantity: state.cartRedcucer.total,
  },
  fetchedProducts: state.requestRemoteDataReducer.products,
  cartProductAttributeSelections:
    state.attributeReducer.cartProductAttributeSelections,
  localProductAttributeSelections:
    state.attributeReducer.localProductAttributeSelections,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  closeOrOpenCartPopper: () => dispatch({ type: 'CLOSE_OR_OPEN_CART_POPPER' }),

  toggleCurrencyMenu: () => dispatch({ type: 'CLOSE_OR_OPEN_CURRENCY_MENU' }),

  selectCurrency: (payload: string) =>
    dispatch({ type: 'SELECT_CURRENCY', payload }),

  selectCategory: (payload: string) =>
    dispatch({ type: 'SELECT_CATEGORY', payload }),

  fetchInitialData: () => requestInitialData(dispatch),

  fetchProductsByCategoryName: (categoryName: ICategory['name']) =>
    requestProductsByCategoryName(dispatch, categoryName),

  addProductToCart: (composedId: string, product: IProduct, quantity: number) =>
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: { composedId, product, quantity },
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
