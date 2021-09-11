import React from 'react';
import { Image, ImageWrapper } from './styles';

interface Props {
  src: string;
  width: string;
  height: string;
  styleBody?: React.CSSProperties;
  styleImage?: React.CSSProperties;
  render?: () => React.ReactElement;
  handleOnMouseOver?: () => void;
}

export class ImageCard extends React.Component<Props> {
  render() {
    const {
      src,
      width,
      height,
      styleBody = {},
      styleImage = {},
      render = () => <></>,
      handleOnMouseOver,
    } = this.props;
    return (
      <ImageWrapper
        style={{ width, height, ...styleBody }}
        onMouseOver={handleOnMouseOver}
      >
        <Image src={src} style={{ ...styleImage }} />
        {render()}
      </ImageWrapper>
    );
  }
}
