import React from 'react';
import {
  CurrencyMenuContainer,
  CurrencyMenuButton,
  CurrencyMenuOptions,
  CurrencyMenuOption,
  CurrencyMenuOptionsWrapper,
} from './styles';
import chevronsrc from './assets/chevron_down.svg';
import { connector, PropsFromRedux } from '../../store';
import { currencyMapper } from '../../shared/mappers';
import { nanoid } from 'nanoid';
import ClickAwayListener from 'react-click-away-listener';

interface Props extends PropsFromRedux {}

class CurrencySwitcher extends React.Component<Props> {
  render() {
    const {
      selectedCurrency,
      selectCurrency,
      currencies,
      toggleCurrencyMenu,
      isCurrencyMenuOpen,
    } = this.props;

    const renderedCurrencies = currencies.map((name) => {
      const icon = currencyMapper[name] || '#';
      return (
        <CurrencyMenuOption
          key={nanoid()}
          onClick={() => {
            selectCurrency(name);
            toggleCurrencyMenu();
          }}
        >
          {`${icon} ${name}`}
        </CurrencyMenuOption>
      );
    });

    return (
      <CurrencyMenuContainer>
        <CurrencyMenuButton
          isMenuOpened={isCurrencyMenuOpen}
          onClick={() => {
            if (!this.props.isCurrencyMenuOpen) toggleCurrencyMenu();
          }}
        >
          {currencyMapper[selectedCurrency] || '#'}{' '}
          <img src={chevronsrc} alt='' />
        </CurrencyMenuButton>
        {isCurrencyMenuOpen && (
          <ClickAwayListener onClickAway={toggleCurrencyMenu}>
            <CurrencyMenuOptionsWrapper>
              <CurrencyMenuOptions>{renderedCurrencies}</CurrencyMenuOptions>
            </CurrencyMenuOptionsWrapper>
          </ClickAwayListener>
        )}
      </CurrencyMenuContainer>
    );
  }
}

export default connector(CurrencySwitcher);
