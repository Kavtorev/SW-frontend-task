import styled from 'styled-components';
import { ScrollYAuto } from '../../common';

export const CartProductsListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 60vh;
  ${ScrollYAuto}
`;

export const AttributeButtonsGroupWrapper = styled.div`
  max-height: 80px;
  margin-top: 1.6em;

  & > div:not(:first-child) {
    margin-top: calc(var(--m-xs) - 0.3em);
  }
`;
