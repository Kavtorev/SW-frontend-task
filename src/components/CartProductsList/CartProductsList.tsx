import React from 'react';
import { CartProductsListWrapper } from './styles';
import { connector, PropsFromRedux } from '../../store';
import { CartProductItem } from '../CartProductItem';
import { nanoid } from 'nanoid';

interface Props extends PropsFromRedux {}

class CartProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products },
    } = this.props;

    const renderedCartItems = Object.keys(products).map((composedId) => {
      return (
        <CartProductItem
          key={nanoid()}
          product={products[composedId]}
          composedId={composedId}
        />
      );
    });

    return (
      <CartProductsListWrapper>{renderedCartItems}</CartProductsListWrapper>
    );
  }
}

export default connector(CartProductsList);
