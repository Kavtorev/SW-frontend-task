import React from 'react';
import { StyledAttributeButton, StyledProps } from './styles';

interface Props extends StyledProps {
  handleClick?: () => void;
}

export class AttributeButton extends React.Component<Props> {
  render() {
    const {
      selected,
      size,
      children,
      handleClick,
      attributeType = 'text',
      value = 'inherit',
    } = this.props;
    return (
      <StyledAttributeButton
        value={value}
        attributeType={attributeType}
        selected={selected}
        size={size}
        onClick={handleClick}
      >
        {attributeType === 'text' && children}
      </StyledAttributeButton>
    );
  }
}
