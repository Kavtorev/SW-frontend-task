import React from 'react';
import { ProductCardContainer, ProductName, CartButton } from './styles';
import { OutOfStockHolder } from '../OutOfStockHolder';
import iconsrc from './assets/Circle Icon.svg';
import { ImageCard } from '../../common';
import { Price } from '../Price';
import { AddToCartButton } from '../AddToCartButton';
import { IProduct } from '../../shared';

interface Props {
  product: IProduct;
  handleOnClick: (id: string) => void;
}

export class ProductCard extends React.Component<Props> {
  render() {
    const { prices, name, gallery, inStock, id } = this.props.product;
    const { handleOnClick } = this.props;

    return (
      <ProductCardContainer
        disabled={!inStock}
        onClick={() => handleOnClick(id)}
      >
        <ImageCard
          src={gallery[0]}
          width='354px'
          height='330px'
          styleBody={{ position: 'relative' }}
          render={() => {
            return (
              <>
                {inStock ? (
                  <AddToCartButton
                    product={this.props.product}
                    render={(handleClick) => {
                      return (
                        <CartButton
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => {
                            event.stopPropagation();
                            handleClick();
                          }}
                        >
                          <img src={iconsrc} alt='Add to Cart' />
                        </CartButton>
                      );
                    }}
                  />
                ) : (
                  <OutOfStockHolder>out of stock</OutOfStockHolder>
                )}
              </>
            );
          }}
        />
        <ProductName>{name}</ProductName>
        <Price prices={prices} size='normal' showTitle={false} />
      </ProductCardContainer>
    );
  }
}
