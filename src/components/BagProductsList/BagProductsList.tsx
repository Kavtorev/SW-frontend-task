import React from 'react';
import { BagProductsListWrapper } from './styles';
import { connector, PropsFromRedux } from '../../store';
import { BagProductItem } from '../BagProductItem';
import { nanoid } from 'nanoid';

interface Props extends PropsFromRedux {}

class BagProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products },
    } = this.props;

    const renderedBagProductItems = Object.keys(products).map((composedId) => {
      return (
        <BagProductItem
          key={nanoid()}
          product={products[composedId]}
          composedId={composedId}
        />
      );
    });

    return (
      <BagProductsListWrapper>{renderedBagProductItems}</BagProductsListWrapper>
    );
  }
}

export default connector(BagProductsList);
