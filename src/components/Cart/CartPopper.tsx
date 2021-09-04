import React from 'react';
import { PropsFromRedux, connector } from '../../store';
import { CartProductsList } from '../CartProductsList';
import { Price } from '../Price';
import { Link } from 'react-router-dom';
import {
  CartPopperContainer,
  CartPopperFooter,
  CartPopperHeader,
  ItemsQuantity,
  CheckOutButton,
  CartPopperTotalWrapper,
  Total,
} from './styles';

interface Props extends PropsFromRedux {}

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

    for (let curr of currencies) {
      hashMap[curr] = 0;
    }

    for (let productId in mappedQuantities) {
      const foundProduct = products.find((product) => product.id === productId);

      if (foundProduct) {
        for (let price of foundProduct.prices) {
          hashMap[price.currency] += +(
            price.amount * mappedQuantities[productId]
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

  render() {
    const {
      cartProducts: { totalQuantity, products },
    } = this.props;

    return (
      <CartPopperContainer>
        <CartPopperHeader>
          My Bag,{' '}
          <ItemsQuantity>{`${totalQuantity} ${this.getQuantityText(
            totalQuantity
          )}`}</ItemsQuantity>
        </CartPopperHeader>
        <CartProductsList />
        <CartPopperTotalWrapper>
          <Total>Total</Total>
          <Price
            prices={this.getTotalPrice()}
            showTitle={false}
            style={{
              fontWeight: 700,
              lineHeight: 1.125,
              fontSize: '1rem',
              maxWidth: '200px',
            }}
          />
        </CartPopperTotalWrapper>
        <CartPopperFooter>
          <Link
            to='/cart'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'uppercase',
              fontSize: 'var(--fs-xs)',
              border: '1px solid var(--c-black)',
              width: '140px',
              height: '43px',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: 'transparent',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            View Bag
          </Link>
          <CheckOutButton>Check out</CheckOutButton>
        </CartPopperFooter>
      </CartPopperContainer>
    );
  }
}

export default connector(CartPopper);
