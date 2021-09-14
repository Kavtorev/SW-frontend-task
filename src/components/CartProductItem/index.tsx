import React from 'react';
import { IProduct, IAttributeSet, IAttribute } from '../../shared';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import { AttributeButtonsGroupWrapper } from './styles';
import { nanoid } from 'nanoid';
import {
  Price,
  ProductAdvancedTitle,
  AttributeButton,
  AttributeButtonsGroup,
  CartProductLayout,
} from '..';
import { ImageCard } from '../../common';

interface Props {
  product: IProduct;
  composedId: string;
}

export class CartProductItem extends React.Component<Props> {
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
            size='small'
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
        <AttributeButtonsGroup
          key={nanoid()}
          name={set.name}
          nameSize='small'
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
      );
    });

    const wrappedRenderedAttributeSet = (
      <AttributeButtonsGroupWrapper key={nanoid()}>
        {renderedAttributeSet}
      </AttributeButtonsGroupWrapper>
    );

    const productMeta = (
      <>
        <ProductAdvancedTitle
          brand={brand}
          name={name}
          brandClassName='cart__product__item__brand'
          nameClassName='cart__product__item__name'
        />
        <Price prices={prices} showTitle={false} size='small' />
        {wrappedRenderedAttributeSet}
      </>
    );
    const rightRender = (
      <ImageCard
        src={gallery[0]}
        imageBodyClassName='imageBody__cart__product__item'
        imageClassName='image__cart__product__item'
      />
    );

    return (
      <CartProductLayout
        composedId={composedId}
        increaseSrc={plussrc}
        decreaseSrc={minussrc}
        productMeta={productMeta}
        rightRender={rightRender}
      />
    );
  }
}
