import React from 'react';
import {
  CurrencyMenuContainer,
  CurrencyMenuButton,
  CurrencyMenuOptions,
  CurrencyMenuOption,
  CurrencyMenuOptionsWrapper,
  ChevronImage,
} from './styles';
import chevronsrc from './assets/chevron_down.svg';
import { connector, PropsFromRedux } from '../../store';
import { currencyMapper } from '../../shared/mappers';
import { nanoid } from 'nanoid';
import ClickAwayListener from 'react-click-away-listener';

interface Props extends PropsFromRedux {}

class CurrencySwitcher extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.isCurrencyMenuOpen !== this.props.isCurrencyMenuOpen;
  }

  render() {
    const {
      selectedCurrency,
      selectCurrency,
      currencies,
      setOpenCurrencyMenu,
      isCurrencyMenuOpen,
    } = this.props;

    const renderedCurrencies = currencies.map((name) => {
      const icon = currencyMapper[name] || '#';
      const title = `${icon} ${name}`;

      return (
        <CurrencyMenuOption
          key={nanoid()}
          onClick={() => {
            selectCurrency(name);
            setOpenCurrencyMenu(false);
          }}
        >
          {title}
        </CurrencyMenuOption>
      );
    });

    const currencyLogo = currencyMapper[selectedCurrency] || '#';

    const renderedCurrencyMenuOptions = isCurrencyMenuOpen && (
      <CurrencyMenuOptionsWrapper>
        <CurrencyMenuOptions>{renderedCurrencies}</CurrencyMenuOptions>
      </CurrencyMenuOptionsWrapper>
    );

    return (
      <ClickAwayListener onClickAway={() => setOpenCurrencyMenu(false)}>
        <CurrencyMenuContainer>
          <CurrencyMenuButton
            isMenuOpened={isCurrencyMenuOpen}
            onClick={() => setOpenCurrencyMenu(!isCurrencyMenuOpen)}
          >
            {currencyLogo} <ChevronImage src={chevronsrc} alt='Chevron' />
          </CurrencyMenuButton>
          {renderedCurrencyMenuOptions}
        </CurrencyMenuContainer>
      </ClickAwayListener>
    );
  }
}

export default connector(CurrencySwitcher);
