import React from 'react';
import {
  Image,
  ImageWrapper,
  ImageBodyClassNames,
  ImageClassNames,
} from './styles';

interface Props {
  src: string;
  imageBodyClassName?: ImageBodyClassNames;
  imageClassName?: ImageClassNames;
  render?: () => React.ReactElement;
  handleOnMouseOver?: () => void;
}

export class ImageCard extends React.Component<Props> {
  render() {
    const {
      src,
      imageBodyClassName = '',
      imageClassName = '',
      render = () => <></>,
      handleOnMouseOver,
    } = this.props;
    return (
      <ImageWrapper
        className={imageBodyClassName}
        onMouseOver={handleOnMouseOver}
      >
        <Image src={src} className={imageClassName} />
        {render()}
      </ImageWrapper>
    );
  }
}
