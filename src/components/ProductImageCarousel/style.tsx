import styled from 'styled-components';

const Arrow = styled.img`
  position: absolute;
  top: 50%;
  cursor: pointer;
`;

export const CartProductLeftArrow = styled(Arrow)`
  left: -2px;
  transform: translateY(-50%);
`;
export const CartProductRightArrow = styled(Arrow)`
  right: -2px;
  transform: translateY(-50%) rotate(-180deg);
`;
