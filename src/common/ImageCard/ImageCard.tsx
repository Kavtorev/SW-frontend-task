import React from 'react';
import { Image, ImageWrapper } from './styles';

interface Props {
  src: string;
  width: string;
  height: string;
  styleBody?: React.CSSProperties;
  styleImage?: React.CSSProperties;
  render?: () => React.ReactElement;
  handleClick?: () => void;
}

export default class ImageCard extends React.Component<Props> {
  render() {
    const {
      src,
      width,
      height,
      styleBody = {},
      styleImage = {},
      render = () => <></>,
      handleClick,
    } = this.props;
    return (
      <ImageWrapper
        style={{ width, height, ...styleBody }}
        onClick={handleClick}
      >
        <Image src={src} style={{ ...styleImage }} />
        {render()}
      </ImageWrapper>
    );
  }
}
