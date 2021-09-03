import React from 'react';
import { StyledAttributeButton, StyledProps } from './styles';
import { IAttribute } from '../../shared';

interface Props extends StyledProps {}

export class AttributeButton extends React.Component<Props> {
  render() {
    const { selected, size, children } = this.props;
    return (
      <StyledAttributeButton selected={selected} size={size}>
        {children}
      </StyledAttributeButton>
    );
  }
}
