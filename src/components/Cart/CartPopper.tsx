import React from 'react';
import { PropsFromRedux, connector } from '../../store';
import { CartProductsList } from '../CartProductsList';
import { Price } from '../Price';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  CartPopperContainer,
  CartPopperFooter,
  CartPopperHeader,
  ItemsQuantity,
  CheckOutButton,
  CartPopperTotalWrapper,
  Total,
  ViewBagLink,
} from './styles';
import ClickAwayListener from 'react-click-away-listener';

interface Props extends PropsFromRedux, RouteComponentProps {}

class CartPopper extends React.Component<Props> {
  getQuantityText = (totalQuantity: number) => {
    return totalQuantity > 1 || totalQuantity === 0 ? 'items' : 'item';
  };

  getTotalPrice = () => {
    const {
      currencies,
      cartProducts: { products, mappedQuantities },
    } = this.props;
    const hashMap: { [currency: string]: number } = {};

    for (let curr of currencies) hashMap[curr] = 0;

    for (let composedId in mappedQuantities) {
      const foundProduct = products[composedId] || '';

      if (foundProduct) {
        for (let price of foundProduct.prices) {
          hashMap[price.currency] += +(
            price.amount * mappedQuantities[composedId]
          ).toFixed(2);
        }
      }
    }

    const result = [];

    for (let curr in hashMap) {
      result.push({ currency: curr, amount: hashMap[curr] });
    }

    return result;
  };

  handleViewBagClick = () => this.props.history.push('/cart');

  render() {
    const {
      cartProducts: { totalQuantity },
      setOpenCartPopper,
    } = this.props;

    const itemsQuantityText = `${totalQuantity} ${this.getQuantityText(
      totalQuantity
    )}`;

    return (
      <ClickAwayListener onClickAway={() => setOpenCartPopper(false)}>
        <CartPopperContainer>
          <CartPopperHeader>
            My Bag, <ItemsQuantity>{itemsQuantityText}</ItemsQuantity>
          </CartPopperHeader>
          <CartProductsList />
          <CartPopperTotalWrapper>
            <Total>Total</Total>
            <Price
              prices={this.getTotalPrice()}
              showTitle={false}
              priceClassName='price__cart__popper'
            />
          </CartPopperTotalWrapper>
          <CartPopperFooter>
            <ViewBagLink onClick={this.handleViewBagClick}>
              View Bag
            </ViewBagLink>
            <CheckOutButton>Check out</CheckOutButton>
          </CartPopperFooter>
        </CartPopperContainer>
      </ClickAwayListener>
    );
  }
}

export default connector(withRouter(CartPopper));
