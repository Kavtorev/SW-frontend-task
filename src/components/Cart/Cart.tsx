import React from 'react';
import { CartButton, ItemsHolder, CartImage } from './styles';
import cartsrc from './assets/Empty Cart.svg';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {}

class Cart extends React.Component<Props> {
  render() {
    const {
      setOpenCartPopper,
      isCartPopperOpen,
      cartProducts: { totalQuantity },
    } = this.props;

    return (
      <CartButton onClick={() => setOpenCartPopper(!isCartPopperOpen)}>
        <CartImage src={cartsrc} alt='Shopping Cart' />
        <ItemsHolder>{totalQuantity}</ItemsHolder>
      </CartButton>
    );
  }
}

export default connector(Cart);
