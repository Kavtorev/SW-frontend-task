import React from 'react';
import {
  ProductCardContainer,
  ProductFullName,
  CartButton,
  CartImage,
} from './styles';
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
  cartButtonClickHandler =
    (clickHandler: () => void) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      clickHandler();
    };

  render() {
    const { prices, name, gallery, inStock, brand, id } = this.props.product;
    const { handleOnClick, product } = this.props;

    const productFullName = `${brand} ${name}`;

    const imageCardRender = inStock ? (
      <AddToCartButton
        product={product}
        render={(handleClick) => {
          return (
            <CartButton onClick={this.cartButtonClickHandler(handleClick)}>
              <CartImage src={iconsrc} alt='Add to Cart' />
            </CartButton>
          );
        }}
      />
    ) : (
      <OutOfStockHolder>out of stock</OutOfStockHolder>
    );

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
          render={() => <>{imageCardRender}</>}
        />
        <ProductFullName>{productFullName}</ProductFullName>
        <Price prices={prices} size='normal' showTitle={false} />
      </ProductCardContainer>
    );
  }
}
