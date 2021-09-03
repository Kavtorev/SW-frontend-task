import styled from 'styled-components';
import { Title } from '../../common/RobotoCondensedTitle/styles';
export const AttributeButtonsGroupWrapper = styled.div`
  display: flex;

  & > button:not(:first-child) {
    margin-left: var(--m-xs);
  }
`;

export const AttributeName = styled(Title)``;
