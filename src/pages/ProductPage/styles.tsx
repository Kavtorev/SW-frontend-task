import styled from 'styled-components';
import { Button, ScrollY } from '../../common';

export const ProductPageWrapper = styled.div`
  display: flex;
  margin-top: var(--m-m);
`;

export const ProductPageGallery = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2.5em;
  height: 510px;

  ${ScrollY}

  & > div {
    margin-bottom: var(--m-m);
  }
`;
export const ProductPageDetailsSide = styled.div`
  display: flex;
`;

export const CartButton = styled(Button)`
  width: 292px;
  height: 52px;
  background-color: var(--c-primary);
  border: 0;
  color: #ffffff;
  margin-bottom: 2.5em;
`;

export const ProductDescription = styled.div`
  font-family: var(--roboto-ff);
  font-weight: var(--fw-normal);
  line-height: 1.625;

  & * {
    font-family: var(--roboto-ff);
  }
`;

export const ProductImageWrapper = styled.div`
  height: 510px;
  margin-right: var(--m-xl);
`;

export const ProductPagePrimaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
`;

export const AttributeButtonsContainer = styled.div`
  margin-bottom: var(--m-s);
`;
