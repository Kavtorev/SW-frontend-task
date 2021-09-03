import React from 'react';
import {
  CurrencyMenuContainer,
  CurrencyMenuButton,
  CurrencyMenuOptions,
  CurrencyMenuOption,
} from './styles';
import chevronsrc from './assets/chevron_down.svg';
import { connector, PropsFromRedux } from '../../store';
import { currencyMapper } from '../../shared/mappers';

interface Props extends PropsFromRedux {}

class CurrencySwitcher extends React.Component<Props> {
  render() {
    const { selectedCurrency, selectCurrency, currencies } = this.props;
    const renderedCurrencies = currencies.map((name) => {
      const icon = currencyMapper[name] || '#';
      return (
        <CurrencyMenuOption key={name} onClick={() => selectCurrency(name)}>
          {`${icon} ${name}`}
        </CurrencyMenuOption>
      );
    });

    return (
      <CurrencyMenuContainer>
        <CurrencyMenuButton>
          {currencyMapper[selectedCurrency] || '#'}{' '}
          <img src={chevronsrc} alt='' />
        </CurrencyMenuButton>
        <CurrencyMenuOptions>{renderedCurrencies}</CurrencyMenuOptions>
      </CurrencyMenuContainer>
    );
  }
}

export default connector(CurrencySwitcher);
