import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import {
  ProductBagItemWrapper,
  ProductBagItemLeft,
  ProductBagItemRight,
  ProductBagItemIncreaseButton,
  ProductBagItemQuantity,
  ProductBagItemDecreaseButton,
  ProductBagItemSettings,
} from './styles';

interface Props extends PropsFromRedux {
  increaseSrc: string;
  decreaseSrc: string;
  rightRender: React.ReactElement;
  productMeta: React.ReactElement;
  productMetaStyles?: React.CSSProperties;
  quantity?: number;
  productId: string;
}

class ProductBagItem extends React.Component<Props> {
  handleDecreaseClick = () => {
    const {
      productId,
      changeProductQuantity,
      removeProductFromCart,
      cartProducts: { mappedQuantities },
    } = this.props;

    if (!(mappedQuantities[productId] - 1)) {
      removeProductFromCart(productId);
      return;
    }

    changeProductQuantity({ productId, quantity: -1 });
  };

  handleIncreaseClick = () => {
    const { productId, changeProductQuantity } = this.props;
    changeProductQuantity({ productId, quantity: 1 });
  };

  render() {
    const {
      increaseSrc,
      decreaseSrc,
      rightRender,
      productMeta,
      quantity,
      productMetaStyles,
    } = this.props;
    return (
      <ProductBagItemWrapper>
        <ProductBagItemLeft style={{ ...productMetaStyles }}>
          {productMeta}
        </ProductBagItemLeft>
        <ProductBagItemRight>
          <ProductBagItemSettings>
            <ProductBagItemIncreaseButton onClick={this.handleIncreaseClick}>
              <img src={increaseSrc} alt='' />
            </ProductBagItemIncreaseButton>
            <ProductBagItemQuantity>{quantity}</ProductBagItemQuantity>
            <ProductBagItemDecreaseButton onClick={this.handleDecreaseClick}>
              <img src={decreaseSrc} alt='' />
            </ProductBagItemDecreaseButton>
          </ProductBagItemSettings>
          {rightRender}
        </ProductBagItemRight>
      </ProductBagItemWrapper>
    );
  }
}

export default connector(ProductBagItem);
