import styled from 'styled-components';
import { Button } from '../../common';

export const CartButton = styled.button`
  position: relative;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const ItemsHolder = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-family: var(--roboto-ff);
  background-color: var(--c-black);
  color: #ffffff;
  font-weight: var(--fw-bold);
  font-size: var(--fs-xs);
`;

export const CartPopperContainer = styled.div`
  position: fixed;
  right: 87px;
  width: 325px;
  height: 510px;
  display: block;
  background-color: #ffffff;
  padding: var(--p-s) var(--p-m) var(--p-l);
  line-height: 1.6;
  z-index: 1000;
  opacity: 1;
`;

export const CartPopperHeader = styled.div`
  font-weight: var(--fw-bold);
`;

export const ItemsQuantity = styled.span`
  font-weight: var(--fw-medium);
`;

export const CartPopperTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.25em;
`;

export const Total = styled.span`
  font-family: var(--roboto-ff);
  font-weight: var(--fw-medium);
  line-height: 1.6;
`;

export const CartPopperFooter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2.1875em;

  & > button:not(:first-child) {
    margin-left: var(--m-xs);
  }
`;

export const ViewBagLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: var(--fs-xs);
  border: 1px solid var(--c-black);
  width: 140px;
  height: 43px;
  cursor: pointer;
  font-weight: var(--fw-semibold);
  background-color: transparent;
`;

export const CheckOutButton = styled(Button)`
  background-color: var(--c-primary);
  color: #ffffff;
  border: 0;
`;
