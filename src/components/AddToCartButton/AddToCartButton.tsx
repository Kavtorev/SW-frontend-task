import React from 'react';
import { connector, PropsFromRedux } from '../../store';

interface Props extends PropsFromRedux {
  render: (
    handleClick: PropsFromRedux['addProductToCart']
  ) => React.ReactElement;
}

class AddToCartButton extends React.Component<Props> {
  render() {
    const { render, addProductToCart } = this.props;
    return <>{render(addProductToCart)}</>;
  }
}

export default connector(AddToCartButton);
