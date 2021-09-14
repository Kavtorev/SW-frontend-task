import styled from 'styled-components';

export const AttributeButtonsGroupWrapper = styled.div`
  margin-top: 1.6em;

  & > div:not(:first-child) {
    margin-top: calc(var(--m-xs) - 0.3em);
  }
`;
