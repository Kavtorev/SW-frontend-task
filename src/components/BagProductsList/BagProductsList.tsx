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
      cartProducts: { products, mappedQuantities },
    } = this.props;
    return (
      <BagProductsListWrapper>
        {products.map(({ id, gallery, brand, name, prices, attributes }) => {
          return (
            <ProductBagItem
              key={nanoid()}
              productId={id}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
              quantity={mappedQuantities[id]}
              rightRender={<ProductImageCarousel gallery={gallery} />}
              productMeta={
                <>
                  <ProductAdvancedTitle brand={brand} name={name} />
                  <Price
                    prices={prices}
                    showTitle={false}
                    size='large'
                    multiplyBy={mappedQuantities[id]}
                  />

                  {attributes.map((set) => {
                    return (
                      <AttributeButtonsContainer key={nanoid()}>
                        <AttributeButtonsGroup
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
