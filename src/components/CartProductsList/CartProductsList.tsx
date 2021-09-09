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
      cartProducts: { products },
    } = this.props;
    return (
      <CartProductsListWrapper>
        {Object.keys(products).map((composedId) => {
          const { brand, name, gallery, prices, id, attributes } =
            products[composedId];
          return (
            <ProductBagItem
              key={nanoid()}
              composedId={composedId}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
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
                  <Price prices={prices} showTitle={false} size='small' />
                  <AttributeButtonsGroupWrapper>
                    {attributes.map((set) => {
                      return (
                        <AttributeButtonsGroup
                          key={nanoid()}
                          showName={
                            set.items[0].id === 'No' ||
                            set.items[0].id === 'Yes'
                          }
                          name={set.name}
                          nameSize='small'
                          composedId={composedId}
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
                                      disabled={true}
                                      size='small'
                                      selected={selectedItemId === item.id}
                                      handleClick={() =>
                                        handleSelection(item.id)
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
