import React from 'react';
import { Brand, Name } from './styles';

interface Props {
  brand: string;
  name: string;
  brandStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  className?: string;
}

export class ProductAdvancedTitle extends React.Component<Props> {
  render() {
    const {
      brand,
      name,
      brandStyle = {},
      nameStyle = {},
      className = '',
    } = this.props;
    return (
      <div className={className}>
        <Brand style={{ ...brandStyle }}>{brand}</Brand>
        <Name style={{ ...nameStyle }}>{name}</Name>
      </div>
    );
  }
}
