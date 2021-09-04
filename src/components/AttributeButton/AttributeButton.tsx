import React from 'react';
import { StyledAttributeButton, StyledProps } from './styles';
import { IAttribute } from '../../shared';

interface Props extends StyledProps {
  handleClick?: () => void;
}

export class AttributeButton extends React.Component<Props> {
  render() {
    const { selected, size, children, handleClick } = this.props;
    return (
      <StyledAttributeButton
        selected={selected}
        size={size}
        onClick={handleClick}
      >
        {children}
      </StyledAttributeButton>
    );
  }
}
