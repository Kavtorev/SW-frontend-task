import styled from 'styled-components';
import { Truncate } from '../../common';

const baseSpan = styled.span`
  font-size: var(--fs-l);
  line-height: 1;
  display: block;
  line-height: 1.6;
`;

export const Brand = styled(baseSpan)`
  font-weight: var(--fw-semibold);
  ${Truncate}
`;
export const Name = styled(baseSpan)`
  font-weight: var(--fw-normal);
  ${Truncate}
`;
