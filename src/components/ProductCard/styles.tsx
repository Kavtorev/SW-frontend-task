import styled from 'styled-components';
import { Truncate } from '../../common';

interface Props {
  disabled?: boolean;
}

export const ProductCardContainer = styled.li<Props>`
  width: 386px;
  height: 444px;
  padding: 1em;
  color: ${(props) =>
    props.disabled ? 'var(--c-disabled)' : 'var(--c-black)'};
  line-height: 1.8;
  transition: all 0.8s;
  list-style: none;
  background-color: ${(props) => (props.disabled ? '#FFFFFF' : 'transparent')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: pointer;
  margin-bottom: 4em;

  :hover {
    box-shadow: ${(props) =>
      props.disabled ? 'none' : '0px 4px 35px 0px #a8acb030'};
  }

  :hover button {
    display: ${(props) => (props.disabled ? 'none' : 'inline-block')};
  }
`;

export const ProductFullName = styled.p`
  font-weight: var(--fw-light);
  margin-top: 1.5em;
  font-size: var(--fs-s);
  ${Truncate}
`;

export const CartButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: -26px;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: none;
`;

export const CartImage = styled.img``;
