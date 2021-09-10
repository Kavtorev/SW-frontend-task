import React from 'react';
import { Brand, Name } from './styles';

interface Props {
  brand: string;
  name: string;
  brandStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
}

export class ProductAdvancedTitle extends React.Component<Props> {
  render() {
    const { brand, name, brandStyle = {}, nameStyle = {} } = this.props;
    return (
      <div>
        <Brand style={{ ...brandStyle }}>{brand}</Brand>
        <Name style={{ ...nameStyle }}>{name}</Name>
      </div>
    );
  }
}
