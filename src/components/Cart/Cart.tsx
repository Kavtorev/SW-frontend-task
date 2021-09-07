import React from 'react';
import { CartButton, ItemsHolder } from './styles';
import cartsrc from './assets/Empty Cart.svg';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {}

class Cart extends React.Component<Props> {
  render() {
    const {
      closeOrOpenCartPopper,
      cartProducts: { totalQuantity },
    } = this.props;

    return (
      <CartButton onClick={closeOrOpenCartPopper}>
        <img src={cartsrc} alt='Shopping Cart' />
        <ItemsHolder>{totalQuantity}</ItemsHolder>
      </CartButton>
    );
  }
}

export default connector(Cart);
