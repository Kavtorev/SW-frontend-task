import React from 'react';
import { CartProductsListWrapper } from './styles';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import ImageCard from '../../common/ImageCard/ImageCard';
import { AttributeButton } from '../AttributeButton';
import { ProductAdvancedTitle } from '../ProductAdvancedTitle';
import { Price } from '../Price';
import { AttributeButtonsGroup } from '../AttributeButtonsGroup';
import { connector, PropsFromRedux } from '../../store';
import { ProductBagItem } from '../ProductBagItem';

interface Props extends PropsFromRedux {}

class CartProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products, mappedQuantities },
    } = this.props;
    return (
      <CartProductsListWrapper>
        {products.map(({ brand, name, id, gallery, prices }) => {
          return (
            <ProductBagItem
              key={id}
              productId={id}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
              quantity={mappedQuantities[id]}
              rightRender={
                <ImageCard src={gallery[0]} width='105px' height='100%' />
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
                  <AttributeButtonsGroup
                    showName={false}
                    name={'Sizes'}
                    render={() => {
                      return (
                        <>
                          <AttributeButton size='small'>S</AttributeButton>
                          <AttributeButton size='small' selected={true}>
                            M
                          </AttributeButton>
                        </>
                      );
                    }}
                  />
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
