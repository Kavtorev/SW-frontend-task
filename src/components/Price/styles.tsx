import styled from 'styled-components';
import { Title, Truncate } from '../../common';

interface Props {
  size?: string;
}

const getStyles = (size: string) => {
  let res: { fontWeight: string; fontSize: string; lineHeight: string } = {
    fontSize: '',
    fontWeight: '',
    lineHeight: '',
  };
  switch (size) {
    case 'small':
      res.fontSize = '1rem';
      res.fontWeight = 'var(--fw-medium)';
      res.lineHeight = '1.6';
      return res;
    case 'normal':
      res.fontSize = 'var(--fs-s)';
      res.fontWeight = 'var(--fw-medium)';
      res.lineHeight = '1.8';
      return res;
    case 'large':
      res.fontSize = 'var(--fs-m)';
      res.fontWeight = 'var(--fw-bold)';
      res.lineHeight = '1.125';
      return res;
    default:
      return res;
  }
};

export const PriceTitle = styled(Title)`
  margin-bottom: calc(var(--m-xs) - 0.125em);
`;

export const StyledProductPrice = styled.p<Props>`
  font-weight: ${(props) => getStyles(props.size || 'normal').fontWeight};
  font-size: ${(props) => getStyles(props.size || 'normal').fontSize};
  line-height: ${(props) => getStyles(props.size || 'normal').lineHeight};
  ${Truncate}
`;
