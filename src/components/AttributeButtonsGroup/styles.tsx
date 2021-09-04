import styled from 'styled-components';
import { Title } from '../../common/RobotoCondensedTitle/styles';
export const AttributeButtonsGroupWrapper = styled.div`
  display: flex;
  max-width: 400px;
  & > button:not(:first-child) {
    margin-left: var(--m-xs);
  }
`;

export const AttributeName = styled(Title)`
  margin-bottom: calc(var(--m-xs) - 0.25em);
`;
