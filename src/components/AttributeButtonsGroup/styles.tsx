import styled from 'styled-components';
import { Title } from '../../common';
export const AttributeButtonsGroupWrapper = styled.div`
  display: flex;
  max-width: 400px;
  & > button:not(:first-child) {
    margin-left: var(--m-xs);
  }

  & > button {
    flex-shrink: 0;
  }
`;

export const AttributeName = styled(Title)<{ nameSize: string }>`
  margin-bottom: calc(var(--m-xs) - 0.25em);
  font-size: ${(props) =>
    props.nameSize === 'small' ? '0.75rem' : 'var(--fs-s)'};
  margin-top: ${(props) => (props.nameSize === 'small' ? '0.4em' : '0')};
  margin-bottom: ${(props) => (props.nameSize === 'small' ? '0em' : '0.4em')};
  font-weight: ${(props) =>
    props.nameSize === 'small' ? 'var(--fw-normal)' : 'var(--fw-bold)'};
`;
