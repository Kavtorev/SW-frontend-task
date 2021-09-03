import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { StyledProductPrice, PriceTitle } from './styles';
import { IPrice } from '../../shared';
import { currencyMapper } from '../../shared/mappers';

interface Props extends PropsFromRedux {
  size?: string;
  prices: IPrice[];
  showTitle?: boolean;
  style?: React.CSSProperties;
  multiplyBy?: number;
}

class Price extends React.Component<Props> {
  render() {
    const {
      size = '',
      prices,
      selectedCurrency,
      showTitle = true,
      style = {},
      multiplyBy = 1,
    } = this.props;
    const price = prices.find(({ currency }) => currency === selectedCurrency);
    const currencyIcon = currencyMapper[price?.currency || ''] || '';
    return (
      <>
        {showTitle && <PriceTitle>Price:</PriceTitle>}
        <StyledProductPrice size={size} style={{ ...style }}>
          {`${currencyIcon}${(price?.amount || 0) * multiplyBy}`}
        </StyledProductPrice>
      </>
    );
  }
}

export default connector(Price);
