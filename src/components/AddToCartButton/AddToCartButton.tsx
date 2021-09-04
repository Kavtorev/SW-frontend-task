import React from 'react';
import { IProduct } from '../../shared';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {
  product: IProduct;
  render: (func: () => void) => React.ReactElement;
}

class AddToCartButton extends React.Component<Props> {
  handleCartClick = () => {
    const {
      product,
      addProductToCart,
      changeProductQuantity,
      cartProducts: { mappedQuantities },
    } = this.props;

    if (product.id in mappedQuantities) {
      changeProductQuantity({ productId: product.id, quantity: 1 });
      return;
    }

    addProductToCart(product);
  };

  render() {
    const { render } = this.props;
    return <>{render(() => this.handleCartClick())}</>;
  }
}

export default connector(AddToCartButton);
