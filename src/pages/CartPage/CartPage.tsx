import React from 'react';
import { BagProductsList } from '../../components/BagProductsList';
import { connector, PropsFromRedux } from '../../store';

import { CartPageTitle } from './styles';

interface Props extends PropsFromRedux {}

class CartPage extends React.Component<Props> {
  componentDidMount() {
    if (this.props.isCartPopperOpen) {
      this.props.closeOrOpenCartPopper();
    }
  }
  render() {
    return (
      <section>
        <CartPageTitle>Cart</CartPageTitle>
        <BagProductsList />
      </section>
    );
  }
}

export default connector(CartPage);
