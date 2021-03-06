import React from 'react';
import { ImageCard } from '../../common';
import { CartProductLeftArrow, CartProductRightArrow } from './style';
import chevronsrc from './assets/chevron.svg';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {
  gallery: string[];
  composedId: string;
}

class ProductImageCarousel extends React.Component<Props> {
  render() {
    const {
      mappedProductImageCarouselIndexes,
      handleImageCarouselStep,
      composedId,
      gallery,
    } = this.props;

    const currentIndex = mappedProductImageCarouselIndexes[composedId] || 0;

    const imageCardRender = this.props.gallery.length > 1 && (
      <>
        <CartProductLeftArrow
          src={chevronsrc}
          onClick={() =>
            handleImageCarouselStep(composedId, -1, gallery.length)
          }
        />
        <CartProductRightArrow
          src={chevronsrc}
          onClick={() => handleImageCarouselStep(composedId, 1, gallery.length)}
        />
      </>
    );

    return (
      <ImageCard
        src={gallery[currentIndex]}
        imageBodyClassName='imageBody__product__image__carousel'
        imageClassName='image__product__image__carousel'
        render={() => <>{imageCardRender}</>}
      />
    );
  }
}

export default connector(ProductImageCarousel);
