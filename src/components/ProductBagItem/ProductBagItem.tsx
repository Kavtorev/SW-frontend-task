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
  composedId: string;
}

class ProductBagItem extends React.Component<Props> {
  handleDecreaseClick = () => {
    const {
      composedId,
      cartProducts: { mappedQuantities },
    } = this.props;

    if (!(mappedQuantities[composedId] - 1)) {
      this.props.removeProductFromCart(composedId);
      this.props.removeAllAttributeSelections(composedId);
      return;
    }

    this.props.changeProductQuantity(composedId, -1);
  };

  handleIncreaseClick = () => {
    const { composedId } = this.props;
    this.props.changeProductQuantity(composedId, 1);
  };

  render() {
    const {
      increaseSrc,
      decreaseSrc,
      rightRender,
      productMeta,
      productMetaStyles,
      cartProducts: { mappedQuantities },
      composedId,
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
            <ProductBagItemQuantity>
              {mappedQuantities[composedId]}
            </ProductBagItemQuantity>
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
