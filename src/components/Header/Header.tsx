import React from 'react';
import {
  StyledHeader,
  List,
  ActionsWrapper,
  Navigation,
  LogoWrapper,
  Item,
} from './styles';
import logosrc from './assets/Brand icon.svg';
import Cart from '../Cart/Cart';
import CurrencySwitcher from '../CurrencySwitcher/CurrencySwitcher';
import { connector, PropsFromRedux } from '../../store';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';
interface Props extends PropsFromRedux {}

class Header extends React.Component<Props> {
  render() {
    const { categories, selectCategory } = this.props;
    return (
      <StyledHeader>
        <Navigation>
          <List>
            {categories.map(({ name }) => (
              <Item key={nanoid()}>
                <NavLink
                  onClick={() => selectCategory(name)}
                  to={`/${name}`}
                  activeStyle={{
                    borderBottom: '2px solid var(--c-primary)',
                    color: 'var(--c-primary)',
                    fontWeight: 600,
                  }}
                >
                  {name}
                </NavLink>
              </Item>
            ))}
          </List>
        </Navigation>
        <LogoWrapper>
          <img src={logosrc} alt='Logo' />
        </LogoWrapper>
        <ActionsWrapper>
          <CurrencySwitcher />
          <Cart />
        </ActionsWrapper>
      </StyledHeader>
    );
  }
}

export default connector(Header);
