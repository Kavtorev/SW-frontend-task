import React from 'react';
import { BagProductsList } from '../../components';
import { connector, PropsFromRedux } from '../../store';

import { CartPageTitle } from './styles';

interface Props extends PropsFromRedux {}

class CartPage extends React.Component<Props> {
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
