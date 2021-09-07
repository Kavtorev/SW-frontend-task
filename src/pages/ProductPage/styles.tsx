import styled from 'styled-components';
import { Button } from '../../common';
import { ScrollY, ScrollYAuto } from '../../common';

export const ProductPageWrapper = styled.div`
  display: flex;
  margin-top: var(--m-m);
`;

export const ProductPageGallery = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2.5em;

  & > div {
    margin-bottom: var(--m-m);
  }

  height: 510px;
  ${ScrollY}
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
`;

export const ProductDescription = styled.div`
  height: 200px;
  font-family: var(--roboto-ff);
  font-weight: var(--fw-normal);
  line-height: 1.625;
  ${ScrollYAuto}

  & > * {
    font-family: var(--roboto-ff);
  }
`;

export const ProductImageWrapper = styled.div`
  /* width: 610px; */
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
