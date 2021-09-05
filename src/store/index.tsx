import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  uiReducer,
  requestInitialDataReducer,
  cartRedcucer,
  attributeReducer,
} from './reducers';
import { createLogger } from 'redux-logger';
import { requestInitialData } from './actions';
import { IProduct, IAttributeSet, IAttribute } from '../shared';

export const rootReducers = combineReducers({
  uiReducer,
  requestInitialDataReducer,
  cartRedcucer,
  attributeReducer,
});
const logger = createLogger();
export const store = createStore(rootReducers, applyMiddleware());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const mapState = (state: RootState) => ({
  isCartPopperOpen: state.uiReducer.isCartPopperOpen,
  isCurrencyMenuOpen: state.uiReducer.isCurrencyMenuOpen,
  selectedCurrency: state.uiReducer.selectedCurrency,
  selectedCategory: state.uiReducer.selectedCategory,
  categories: state.requestInitialDataReducer.categories,
  currencies: state.requestInitialDataReducer.currencies,
  initialDataLoading: state.requestInitialDataReducer.isPending,
  initialDataError: state.requestInitialDataReducer.error,
  cartProducts: {
    products: state.cartRedcucer.products,
    mappedQuantities: state.cartRedcucer.mappedQuantities,
    totalQuantity: state.cartRedcucer.total,
  },
  fetchedProducts: state.requestInitialDataReducer.products,
  attributeSelections: state.attributeReducer.mappedAttributeSelections,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  closeOrOpenCartPopper: () => dispatch({ type: 'CLOSE_OR_OPEN_CART_POPPER' }),

  closeOrOpenCurrencyMenu: () =>
    dispatch({ type: 'CLOSE_OR_OPEN_CURRENCY_MENU' }),

  selectCurrency: (payload: string) =>
    dispatch({ type: 'SELECT_CURRENCY', payload }),

  selectCategory: (payload: string) =>
    dispatch({ type: 'SELECT_CATEGORY', payload }),

  fetchInitialData: () => requestInitialData(dispatch),

  addProductToCart: (product: IProduct) =>
    dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: product }),

  removeProductFromCart: (productId: IProduct['id']) =>
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: productId }),

  changeProductQuantity: ({
    productId,
    quantity,
  }: {
    productId: IProduct['id'];
    quantity: number;
  }) =>
    dispatch({
      type: 'CHANGE_PRODUCT_QUANTITY',
      payload: { productId, quantity },
    }),

  selectAttribute: (
    productId: IProduct['id'],
    attrId: IAttributeSet['id'],
    itemId: IAttribute['id']
  ) =>
    dispatch({
      type: 'SELECT_ATTRIBUTE',
      payload: { productId, meta: { attrId, itemId } },
    }),

  unSelectAttribute: (productId: IProduct['id'], attrId: IAttributeSet['id']) =>
    dispatch({ type: 'UNSELECT_ATTRIBUTE', payload: { productId, attrId } }),

  removeAllAttributeSelections: (productId: IProduct['id']) =>
    dispatch({ type: 'REMOVE_ALL_ATTRIBUTE_SELECTIONS', payload: productId }),
});

export const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
