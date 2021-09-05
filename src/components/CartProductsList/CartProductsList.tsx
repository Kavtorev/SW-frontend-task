import React from 'react';
import {
  CartProductsListWrapper,
  AttributeButtonsGroupWrapper,
} from './styles';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import { ImageCard } from '../../common';
import { AttributeButton } from '../AttributeButton';
import { ProductAdvancedTitle } from '../ProductAdvancedTitle';
import { Price } from '../Price';
import { AttributeButtonsGroup } from '../AttributeButtonsGroup';
import { connector, PropsFromRedux } from '../../store';
import { ProductBagItem } from '../ProductBagItem';
import { nanoid } from 'nanoid';

interface Props extends PropsFromRedux {}

class CartProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products, mappedQuantities },
    } = this.props;
    return (
      <CartProductsListWrapper>
        {products.map(({ brand, name, id, gallery, prices, attributes }) => {
          return (
            <ProductBagItem
              key={nanoid()}
              productId={id}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
              quantity={mappedQuantities[id]}
              productMetaStyles={{ maxWidth: '140px' }}
              rightRender={
                <ImageCard
                  src={gallery[0]}
                  width='105px'
                  height='100%'
                  styleImage={{ objectFit: 'contain' }}
                />
              }
              productMeta={
                <>
                  <ProductAdvancedTitle
                    brand={brand}
                    name={name}
                    brandStyle={{ fontWeight: 300, fontSize: '1rem' }}
                    nameStyle={{ fontWeight: 300, fontSize: '1rem' }}
                  />
                  <Price
                    prices={prices}
                    showTitle={false}
                    size='small'
                    multiplyBy={mappedQuantities[id]}
                  />
                  <AttributeButtonsGroupWrapper>
                    {attributes.map((set) => {
                      return (
                        <AttributeButtonsGroup
                          key={nanoid()}
                          showName={false}
                          productId={id}
                          attributeId={set.id}
                          render={(handleSelection, selectedItemId) => {
                            return (
                              <>
                                {set.items.map((item) => {
                                  return (
                                    <AttributeButton
                                      key={nanoid()}
                                      attributeType={set.type}
                                      value={item.value}
                                      size='small'
                                      selected={selectedItemId === item.id}
                                      handleClick={() =>
                                        handleSelection()(id, set.id, item.id)
                                      }
                                    >
                                      {item.displayValue}
                                    </AttributeButton>
                                  );
                                })}
                              </>
                            );
                          }}
                        />
                      );
                    })}
                  </AttributeButtonsGroupWrapper>
                </>
              }
            />
          );
        })}
      </CartProductsListWrapper>
    );
  }
}

export default connector(CartProductsList);
