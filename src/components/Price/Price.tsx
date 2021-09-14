import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { StyledProductPrice, PriceTitle, PriceClassNames } from './styles';
import { IPrice } from '../../shared';
import { currencyMapper } from '../../shared/mappers';

interface Props extends PropsFromRedux {
  size?: string;
  prices: IPrice[];
  showTitle?: boolean;
  multiplyBy?: number;
  className?: string;
  priceClassName?: PriceClassNames;
}

class Price extends React.Component<Props> {
  render() {
    const {
      size = '',
      prices,
      selectedCurrency,
      showTitle = true,
      multiplyBy = 1,
      className = '',
      priceClassName = '',
    } = this.props;

    const price = prices.find((price) => price.currency === selectedCurrency);

    const currencyIcon = currencyMapper[price?.currency || ''] || '';
    const priceAmount = price?.amount || 0;
    const priceMultipliedAmount = (priceAmount * multiplyBy).toFixed(2);

    const priceText = `${currencyIcon}${priceMultipliedAmount}`;
    const title = showTitle && <PriceTitle>Price:</PriceTitle>;

    return (
      <div className={className}>
        {title}
        <StyledProductPrice size={size} className={priceClassName}>
          {priceText}
        </StyledProductPrice>
      </div>
    );
  }
}

export default connector(Price);
