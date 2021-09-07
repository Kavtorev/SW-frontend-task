import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { CartPopper } from '../Cart';
import { StyledOverlay } from './styles';
import ClickAwayListener from 'react-click-away-listener';

interface Props extends PropsFromRedux {}

class CartOverlay extends React.Component<Props> {
  render() {
    const { closeOrOpenCartPopper } = this.props;
    return (
      <>
        <StyledOverlay onClick={closeOrOpenCartPopper} />
        <ClickAwayListener onClickAway={closeOrOpenCartPopper}>
          <CartPopper />
        </ClickAwayListener>
      </>
    );
  }
}

export default connector(CartOverlay);
