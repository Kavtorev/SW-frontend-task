import React from 'react';
import { IProduct } from '../../shared';
import { generateComposedId } from '../../shared/functions';
import { connector, PropsFromRedux } from '../../store';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends PropsFromRedux, RouteComponentProps {
  product: IProduct;
  render: (func: () => void) => React.ReactElement;
}

class AddToCartButton extends React.Component<Props> {
  validateAttributeSelections = () => {
    const { product, localProductAttributeSelections } = this.props;

    if (!product.attributes.length) return true;

    if (product.id in localProductAttributeSelections) {
      for (let attr of product.attributes) {
        const foundSelection = localProductAttributeSelections[product.id].find(
          (pair) => pair.attrId === attr.id
        );

        if (!foundSelection) return false;
      }
      return true;
    }
    return false;
  };

  handleAddProductToCart = (composedId: string) => {
    const {
      addProductToCart,
      setSelectedAttributes,
      localProductAttributeSelections,
      product,
    } = this.props;

    setSelectedAttributes(
      composedId,
      localProductAttributeSelections[product.id] || []
    );
    addProductToCart(composedId, product, 1);
  };

  handleCartClick = () => {
    const {
      changeProductQuantity,
      cartProducts: { mappedQuantities },
      product,
      localProductAttributeSelections,
      history,
    } = this.props;

    const validationResult = this.validateAttributeSelections();

    // display a toast notification or something similar...
    if (!validationResult) {
      return history.push(`/details/${product.id}`);
    }

    const composedId = generateComposedId(
      product,
      localProductAttributeSelections[product.id] || []
    );

    if (composedId in mappedQuantities) {
      return changeProductQuantity(composedId, 1);
    }

    this.handleAddProductToCart(composedId);
  };

  render() {
    const { render } = this.props;
    return <>{render(() => this.handleCartClick())}</>;
  }
}

export default connector(withRouter(AddToCartButton));
