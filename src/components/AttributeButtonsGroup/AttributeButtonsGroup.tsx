import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { AttributeButtonsGroupWrapper, AttributeName } from './styles';

interface State {
  selectedItemId: string;
}

interface Props extends PropsFromRedux {
  name?: string;
  render: (
    handleSelection: () => PropsFromRedux['selectAttribute'],
    selectedItemId: State['selectedItemId']
  ) => React.ReactElement;
  showName?: boolean;
  productId: string;
  attributeId: string;
}

class AttributeButtonsGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedItemId: '',
    };
  }

  componentDidMount() {
    this.setState({ selectedItemId: this.findSelectedItemId() });
  }

  componentDidUpdate() {
    const selectedItemId = this.findSelectedItemId();
    if (selectedItemId !== this.state.selectedItemId) {
      this.setState({ selectedItemId });
    }
  }

  preHandleSelection = () => {
    const { selectAttribute, unSelectAttribute, productId, attributeId } =
      this.props;
    if (this.state.selectedItemId) {
      unSelectAttribute(productId, attributeId);
    }
    return selectAttribute;
  };

  findSelectedItemId() {
    const { attributeSelections, productId, attributeId } = this.props;
    if (productId in attributeSelections) {
      const attribute = attributeSelections[productId].find(
        (attr) => attr.attrId === attributeId
      );

      if (attribute) {
        return attribute.itemId;
      }
    }
    return '';
  }

  render() {
    const { render, name = '', showName = true } = this.props;
    return (
      <div>
        {showName && <AttributeName>{name}</AttributeName>}
        <AttributeButtonsGroupWrapper>
          {render(this.preHandleSelection, this.state.selectedItemId)}
        </AttributeButtonsGroupWrapper>
      </div>
    );
  }
}

export default connector(AttributeButtonsGroup);
