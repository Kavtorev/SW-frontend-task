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
    return (
      <ImageCard
        src={gallery[currentIndex]}
        width='140px'
        height='100%'
        styleBody={{ position: 'relative' }}
        styleImage={{ objectFit: 'contain' }}
        render={() => (
          <>
            {this.props.gallery.length > 1 ? (
              <>
                <CartProductLeftArrow
                  src={chevronsrc}
                  onClick={() =>
                    handleImageCarouselStep(composedId, -1, gallery.length)
                  }
                />
                <CartProductRightArrow
                  src={chevronsrc}
                  onClick={() =>
                    handleImageCarouselStep(composedId, 1, gallery.length)
                  }
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      />
    );
  }
}

export default connector(ProductImageCarousel);
