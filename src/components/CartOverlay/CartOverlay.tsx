import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { CartPopper } from '../Cart';
import { StyledOverlay } from './styles';
interface Props extends PropsFromRedux {}

class CartOverlay extends React.Component<Props> {
  render() {
    const { setOpenCartPopper } = this.props;
    return (
      <>
        <StyledOverlay onClick={() => setOpenCartPopper(false)} />
        <CartPopper />
      </>
    );
  }
}

export default connector(CartOverlay);
