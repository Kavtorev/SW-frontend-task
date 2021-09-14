import React from 'react';
import {
  StyledHeader,
  List,
  ActionsWrapper,
  Navigation,
  LogoWrapper,
  LogoImage,
  Item,
  NavigationContainer,
  NavLinkStyled,
} from './styles';
import logosrc from './assets/Brand icon.svg';
import Cart from '../Cart/Cart';
import CurrencySwitcher from '../CurrencySwitcher/CurrencySwitcher';
import { connector, PropsFromRedux } from '../../store';
import { nanoid } from 'nanoid';

interface Props extends PropsFromRedux {}

class Header extends React.Component<Props> {
  handleHeaderClick = () => {
    if (this.props.isCartPopperOpen) this.props.setOpenCartPopper(false);
  };

  render() {
    const { categories } = this.props;

    const renderedNavLinks = categories.map(({ name }) => (
      <Item key={nanoid()}>
        <NavLinkStyled to={`/${name}`}>{name}</NavLinkStyled>
      </Item>
    ));

    return (
      <StyledHeader onClick={this.handleHeaderClick}>
        <NavigationContainer>
          <Navigation>
            <List>{renderedNavLinks}</List>
          </Navigation>
          <LogoWrapper>
            <LogoImage src={logosrc} alt='Logo' />
          </LogoWrapper>
          <ActionsWrapper>
            <CurrencySwitcher />
            <Cart />
          </ActionsWrapper>
        </NavigationContainer>
      </StyledHeader>
    );
  }
}

export default connector(Header);
