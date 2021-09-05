import styled from 'styled-components';
import { ScrollBoth, ScrollY } from '../../common';

export const CartProductsListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 300px;
  ${ScrollY}
`;

export const AttributeButtonsGroupWrapper = styled.div`
  max-height: 80px;
  margin-top: 1.6em;
  width: 150px;

  & > div:not(:first-child) {
    margin-top: var(--m-xs);
  }
  ${ScrollBoth}
`;
