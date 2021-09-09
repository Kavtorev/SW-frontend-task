import React from 'react';
import {
  IAttributeSet,
  IAttribute,
  IProduct,
  IAttributeMeta,
} from '../../shared';
import { generateComposedId } from '../../shared/function';
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
    quantity: number
  ) => {
    // re-adding attributes in order to match the latest generated composedId.
    const { composedId } = this.props;
    this.props.removeProductFromCart(composedId);
    this.props.addProductToCart(newComposedId, product, quantity);
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
    this.props.removeAllAttributeSelections(composedId);
    this.props.removeProductFromCart(composedId);
    this.props.changeProductQuantity(newComposedId, quantity);
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
    const newComposedId = generateComposedId(product, selection);

    if (composedId !== newComposedId) {
      const productQuantity = cartProducts.mappedQuantities[composedId];

      if (newComposedId in cartProducts.products) {
        return this.handleRestack(newComposedId, productQuantity);
      }

      this.handleReselectAttributes(newComposedId, selection);
      this.handleReaddProductToCart(newComposedId, product, productQuantity);
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
