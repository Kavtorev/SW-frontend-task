import React from 'react';
import { Brand, Name, BrandClassNames, NameClassNames } from './styles';

interface Props {
  brand: string;
  name: string;
  brandClassName?: BrandClassNames;
  nameClassName?: NameClassNames;
  className?: string;
}

export class ProductAdvancedTitle extends React.Component<Props> {
  render() {
    const {
      brand,
      name,
      brandClassName = '',
      nameClassName = '',
      className = '',
    } = this.props;
    return (
      <div className={className}>
        <Brand className={brandClassName}>{brand}</Brand>
        <Name className={nameClassName}>{name}</Name>
      </div>
    );
  }
}
