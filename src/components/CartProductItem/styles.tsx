import styled from 'styled-components';
import { ScrollAutoBoth } from '../../common';

export const AttributeButtonsGroupWrapper = styled.div`
  max-height: 80px;
  margin-top: 1.6em;
  width: 130px;

  & > div:not(:first-child) {
    margin-top: calc(var(--m-xs) - 0.3em);
  }
  ${ScrollAutoBoth}
`;
