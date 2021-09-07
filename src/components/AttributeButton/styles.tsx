import styled from 'styled-components';
import { Button } from '../../common';
import { IAttribute, IAttributeSet } from '../../shared';
export interface StyledProps {
  selected?: boolean;
  size?: 'small' | 'normal';
  attributeType?: IAttributeSet['type'];
  value: IAttribute['value'];
  disabled?: boolean;
}

const getColor = ({ selected, size, attributeType, value }: StyledProps) => {
  const res = {
    width: '',
    height: '',
    color: '',
    backgroundColor: '',
    border: '',
  };

  switch (attributeType) {
    case 'text':
      if (size === 'small') {
        res.width = 'auto';
        res.height = '24px';

        if (selected) {
          let common = '#A6A6A6';
          res.color = common;
          res.border = `1px solid ${common}`;
          res.backgroundColor = 'rgba(166, 166, 166, 0.2)';
        }
        return res;
      }

      // normal
      res.width = '63px';
      res.height = '45px';
      res.border = '1px solid var(--c-black)';

      if (selected) {
        res.color = '#ffffff';
        res.backgroundColor = 'var(--c-black)';
      } else {
        res.color = 'inherit';
        res.backgroundColor = 'inherit';
      }

      return res;
    case 'swatch':
      res.border = 'none';
      res.backgroundColor = value;
      if (size === 'small') {
        res.width = '24px';
        res.height = '24px';

        if (selected) {
          res.border = `2px solid #A6A6A6`;
        }
        return res;
      }

      // normal
      res.width = '63px';
      res.height = '45px';

      if (selected) {
        res.border = '2px solid var(--c-black)';
      }

      return res;
    default:
      return res;
  }
};

export const StyledAttributeButton = styled(Button)<StyledProps>`
  width: ${(props) => getColor(props).width};
  height: ${(props) => getColor(props).height};
  font-family: var(--source-sans-pro-ff);
  font-weight: var(--fw-normal);
  line-height: 1.125;
  color: ${(props) => getColor(props).color};
  background-color: ${(props) => getColor(props).backgroundColor};
  border: ${(props) => getColor(props).border};
  padding: 0.5em;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;
