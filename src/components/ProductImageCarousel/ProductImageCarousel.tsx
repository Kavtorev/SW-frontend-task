import React from 'react';
import { ImageCard } from '../../common';
import { CartProductLeftArrow, CartProductRightArrow } from './style';
import chevronsrc from './assets/chevron.svg';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {
  gallery: string[];
}

interface State {
  currentIndex: number;
}

class ProductImageCarousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  handleStepClick = (step: number) => {
    const len = this.props.gallery.length;
    step >= 0
      ? this.setState({ currentIndex: (this.state.currentIndex + 1) % len })
      : this.setState({
          currentIndex: (this.state.currentIndex - 1 + len) % len,
        });
  };

  render() {
    return (
      <ImageCard
        src={this.props.gallery[this.state.currentIndex]}
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
                  onClick={() => this.handleStepClick(-1)}
                />
                <CartProductRightArrow
                  src={chevronsrc}
                  onClick={() => this.handleStepClick(1)}
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
