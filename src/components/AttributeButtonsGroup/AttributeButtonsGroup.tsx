import React from 'react';
import { AttributeButtonsGroupWrapper, AttributeName } from './styles';

interface Props {
  name?: string;
  render: () => React.ReactElement;
  showName?: boolean;
}

export class AttributeButtonsGroup extends React.Component<Props> {
  render() {
    const { render, name = '', showName = true } = this.props;
    return (
      <>
        {showName && <AttributeName>{name}</AttributeName>}
        <AttributeButtonsGroupWrapper>{render()}</AttributeButtonsGroupWrapper>
      </>
    );
  }
}
