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

class CartProductLayout extends React.Component<Props> {
  handleProductRemoval = () => {
    const { composedId } = this.props;
    this.props.removeProductFromCart(composedId);
    this.props.removeAllAttributeSelections(composedId);
    this.props.removeImageCarouselComposedId(composedId);
  };

  handleDecreaseClick = () => {
    const {
      composedId,
      cartProducts: { mappedQuantities },
    } = this.props;

    const isLastItem = !(mappedQuantities[composedId] - 1);
    if (isLastItem) return this.handleProductRemoval();

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
            <ProductBagItemQuantity className='product_bag_item_quantity'>
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

export default connector(CartProductLayout);
