import styled, { css } from 'styled-components';
import { Truncate } from '../../common';

export type BrandClassNames = '' | 'cart__product__item__brand';
export type NameClassNames = '' | 'cart__product__item__name';

const cartCommon = css`
  font-weight: var(--fw-light);
  font-size: 1rem;
`;

const baseSpan = styled.span`
  font-size: var(--fs-l);
  line-height: 1;
  display: block;
  line-height: 1.6;
`;

export const Brand = styled(baseSpan)`
  font-weight: var(--fw-semibold);
  ${Truncate}

  &.cart__product__item__brand {
    ${cartCommon}
  }
`;
export const Name = styled(baseSpan)`
  font-weight: var(--fw-normal);
  ${Truncate}

  &.cart__product__item__name {
    ${cartCommon}
  }
`;
