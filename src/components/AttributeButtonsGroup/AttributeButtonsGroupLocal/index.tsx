import React from 'react';
import { IAttribute, IProduct } from '../../../shared';
import { connector, PropsFromRedux } from '../../../store';
import { AttributeButtonsGroupWrapper, AttributeName } from '../styles';

interface Props extends PropsFromRedux {
  render: (
    handleSelection: (itemId: IAttribute['id']) => void,
    selectedItemId: IAttribute['id']
  ) => React.ReactElement;
  productId: IProduct['id'];
  attributeId: IAttribute['id'];
  name: string;
}

// product page attribute selection logic...
class AttributeButtonsGroupLocal extends React.Component<Props> {
  handleAttributeSelection = (itemId: IAttribute['id']) => {
    const {
      unSelectLocalAttribute,
      selectLocalAttribute,
      attributeId,
      productId,
    } = this.props;

    const selectedItemId = this.findSelectedItemId();
    if (selectedItemId) unSelectLocalAttribute(productId, attributeId);
    selectLocalAttribute(productId, attributeId, itemId);
  };

  findSelectedItemId = () => {
    const { localProductAttributeSelections, productId, attributeId } =
      this.props;

    if (productId in localProductAttributeSelections) {
      const foundMeta = localProductAttributeSelections[productId].find(
        (pair) => pair.attrId === attributeId
      );

      if (foundMeta) return foundMeta.itemId;
    }

    return '';
  };

  render() {
    const { name } = this.props;
    const selectedItemId = this.findSelectedItemId() || '';

    return (
      <>
        <AttributeName nameSize='normal'>{`${name}: `}</AttributeName>
        <AttributeButtonsGroupWrapper>
          {this.props.render(this.handleAttributeSelection, selectedItemId)}
        </AttributeButtonsGroupWrapper>
      </>
    );
  }
}

export default connector(AttributeButtonsGroupLocal);
