import React from 'react';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import { IProduct, IAttributeSet, IAttribute } from '../../shared';
import { nanoid } from 'nanoid';
import { AttributeButtonsGroupWrapper } from './styles';
import {
  ProductImageCarousel,
  Price,
  ProductAdvancedTitle,
  AttributeButton,
  AttributeButtonsGroup,
  CartProductLayout,
} from '..';

interface Props {
  product: IProduct;
  composedId: string;
}

export class BagProductItem extends React.Component<Props> {
  render() {
    const {
      composedId,
      product: { gallery, brand, name, prices, attributes },
    } = this.props;

    const renderAttributeItems = (
      type: IAttributeSet['type'],
      items: IAttribute[],
      handleSelection: (itemId: IAttribute['id']) => void,
      selectedItemId: IAttribute['id']
    ) => {
      const renderedItems = items.map((item: IAttribute) => {
        return (
          <AttributeButton
            key={nanoid()}
            selected={selectedItemId === item.id}
            value={item.value}
            attributeType={type}
            handleClick={() => handleSelection(item.id)}
          >
            {item.displayValue}
          </AttributeButton>
        );
      });
      return <>{renderedItems}</>;
    };

    const renderedAttributeSet = attributes.map((set: IAttributeSet) => {
      const showName = set.items[0].id === 'No' || set.items[0].id === 'Yes';
      return (
        <AttributeButtonsGroupWrapper key={nanoid()}>
          <AttributeButtonsGroup
            name={set.name}
            composedId={composedId}
            attributeId={set.id}
            showName={showName}
            render={(handleSelection, selectedItemId) =>
              renderAttributeItems(
                set.type,
                set.items,
                handleSelection,
                selectedItemId
              )
            }
          />
        </AttributeButtonsGroupWrapper>
      );
    });

    const productMeta = (
      <>
        <ProductAdvancedTitle brand={brand} name={name} />
        <Price prices={prices} showTitle={false} size='large' />
        {renderedAttributeSet}
      </>
    );

    const rightRender = (
      <ProductImageCarousel gallery={gallery} composedId={composedId} />
    );

    return (
      <CartProductLayout
        composedId={composedId}
        increaseSrc={plussrc}
        decreaseSrc={minussrc}
        rightRender={rightRender}
        productMeta={productMeta}
      />
    );
  }
}
