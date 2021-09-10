import React from 'react';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import { ProductBagItem } from '../ProductBagItem';
import { AttributeButton } from '../AttributeButton';
import { BagProductsListWrapper, AttributeButtonsContainer } from './styles';
import { ProductImageCarousel } from '../ProductImageCarousel';
import { ProductAdvancedTitle } from '../ProductAdvancedTitle';
import { AttributeButtonsGroup } from '../AttributeButtonsGroup';
import { connector, PropsFromRedux } from '../../store';
import { Price } from '../Price';
import { nanoid } from 'nanoid';

interface Props extends PropsFromRedux {}

class BagProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products },
    } = this.props;
    return (
      <BagProductsListWrapper>
        {Object.keys(products).map((composedId) => {
          const { gallery, brand, name, prices, attributes } =
            products[composedId];
          return (
            <ProductBagItem
              key={nanoid()}
              composedId={composedId}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
              rightRender={
                <ProductImageCarousel
                  gallery={gallery}
                  composedId={composedId}
                />
              }
              productMeta={
                <>
                  <ProductAdvancedTitle brand={brand} name={name} />
                  <Price prices={prices} showTitle={false} size='large' />

                  {attributes.map((set) => {
                    return (
                      <AttributeButtonsContainer key={nanoid()}>
                        <AttributeButtonsGroup
                          showName={
                            set.items[0].id === 'No' ||
                            set.items[0].id === 'Yes'
                          }
                          name={set.name}
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
                      </AttributeButtonsContainer>
                    );
                  })}
                </>
              }
            />
          );
        })}
      </BagProductsListWrapper>
    );
  }
}

export default connector(BagProductsList);
