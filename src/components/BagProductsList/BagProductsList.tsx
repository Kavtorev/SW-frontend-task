import React from 'react';
import minussrc from './assets/minus-square.svg';
import plussrc from './assets/plus-square.svg';
import { ProductBagItem } from '../ProductBagItem';
import { AttributeButton } from '../AttributeButton';
import { BagProductsListWrapper } from './styles';
import { ProductImageCarousel } from '../ProductImageCarousel';
import { ProductAdvancedTitle } from '../ProductAdvancedTitle';
import { AttributeButtonsGroup } from '../AttributeButtonsGroup';
import { connector, PropsFromRedux } from '../../store';
import { Price } from '../Price';

const products = [
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '50.00',
    inStock: true,
  },
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '50.00',
    inStock: true,
  },
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '$50.00',
    inStock: true,
  },
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '$50.00',
    inStock: false,
  },
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '$50.00',
    inStock: true,
  },
  {
    gallery:
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
    name: 'Play Station 5',
    price: '$50.00',
    inStock: true,
  },
];

interface Props extends PropsFromRedux {}

class BagProductsList extends React.Component<Props> {
  render() {
    const {
      cartProducts: { products, mappedQuantities },
    } = this.props;
    console.log('products:', products);
    return (
      <BagProductsListWrapper>
        {products.map(({ id, gallery, brand, name, prices }) => {
          return (
            <ProductBagItem
              productId={id}
              increaseSrc={plussrc}
              decreaseSrc={minussrc}
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
                  <AttributeButtonsGroup
                    showName={false}
                    render={() => {
                      return (
                        <>
                          <AttributeButton>S</AttributeButton>
                          <AttributeButton selected={true}>M</AttributeButton>
                        </>
                      );
                    }}
                  />
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
