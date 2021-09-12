import React from 'react';
import {
  IAttributeSet,
  IAttribute,
  IProduct,
  IAttributeMeta,
} from '../../shared';
import { generateComposedId } from '../../shared/functions';
import { connector, PropsFromRedux } from '../../store';
import { AttributeButtonsGroupWrapper, AttributeName } from './styles';

interface Props extends PropsFromRedux {
  render: (
    handleSelection: (itemId: IAttribute['id']) => void,
    selectedItemId: IAttribute['id']
  ) => React.ReactElement;
  name?: string;
  showName?: boolean;
  composedId: string;
  attributeId: IAttributeSet['id'];
  nameSize?: string;
}

class AttributeButtonsGroup extends React.Component<Props> {
  handleReaddProductToCart = (
    newComposedId: string,
    product: IProduct,
    quantity: number,
    index: number
  ) => {
    // re-adding attributes in order to match the latest generated composedId.
    const { composedId } = this.props;
    this.props.removeProductFromCart(composedId);
    this.props.addProductToCartAtIndex(newComposedId, product, quantity, index);
  };

  handleReselectAttributes = (
    newComposedId: string,
    selection: IAttributeMeta[]
  ) => {
    // re-selecting attributes in order to match the latest generated composedId.
    const { composedId } = this.props;
    this.props.removeAllAttributeSelections(composedId);
    this.props.setSelectedAttributes(newComposedId, selection);
  };

  handleRestack = (newComposedId: string, quantity: number) => {
    const { composedId } = this.props;
    this.props.removeImageCarouselComposedId(composedId);
    this.props.removeAllAttributeSelections(composedId);
    this.props.removeProductFromCart(composedId);
    this.props.changeProductQuantity(newComposedId, quantity);
  };

  handleImageCarouselUpdate = (newComposedId: string) => {
    const { composedId } = this.props;
    this.props.updateImageCarouselComposedId(composedId, newComposedId);
    this.props.removeImageCarouselComposedId(composedId);
  };

  handleSelection = (itemId: IAttribute['id']) => {
    const {
      composedId,
      attributeId,
      cartProductAttributeSelections,
      cartProducts,
    } = this.props;

    const selection = cartProductAttributeSelections[composedId]
      .filter((pair) => pair.attrId !== attributeId)
      .concat([{ attrId: attributeId, itemId }]);

    const product = cartProducts.products[composedId];
    const productQuantity = cartProducts.mappedQuantities[composedId];
    const productIndexInCart = Object.keys(cartProducts.products).findIndex(
      (compId) => compId === composedId
    );

    const newComposedId = generateComposedId(product, selection);

    if (composedId !== newComposedId) {
      if (newComposedId in cartProducts.products) {
        return this.handleRestack(newComposedId, productQuantity);
      }

      // prevents image carousel from resetting
      this.handleImageCarouselUpdate(newComposedId);
      this.handleReselectAttributes(newComposedId, selection);
      this.handleReaddProductToCart(
        newComposedId,
        product,
        productQuantity,
        productIndexInCart
      );
    }
  };

  findSelectedCartItemId = () => {
    const { cartProductAttributeSelections, attributeId, composedId } =
      this.props;

    if (composedId in cartProductAttributeSelections) {
      const foundMeta = cartProductAttributeSelections[composedId].find(
        (pair) => pair.attrId === attributeId
      );

      if (foundMeta) return foundMeta.itemId;
    }

    return '';
  };

  render() {
    const {
      render,
      name = '',
      showName = true,
      nameSize = 'normal',
    } = this.props;

    const selectedItemId = this.findSelectedCartItemId() || '';
    return (
      <>
        {showName && (
          <AttributeName nameSize={nameSize}>{`${name}:`}</AttributeName>
        )}
        <AttributeButtonsGroupWrapper>
          {render(this.handleSelection, selectedItemId)}
        </AttributeButtonsGroupWrapper>
      </>
    );
  }
}

export default connector(AttributeButtonsGroup);
