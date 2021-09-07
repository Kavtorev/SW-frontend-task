import styled from 'styled-components';
import { ScrollYAuto, ScrollAutoBoth } from '../../common';

export const CartProductsListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 300px;
  ${ScrollYAuto}
`;

export const AttributeButtonsGroupWrapper = styled.div`
  max-height: 80px;
  margin-top: 1.6em;
  width: 130px;

  & > div:not(:first-child) {
    margin-top: var(--m-xs);
  }
  ${ScrollAutoBoth}
`;
