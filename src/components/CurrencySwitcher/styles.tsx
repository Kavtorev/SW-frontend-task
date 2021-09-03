import styled from 'styled-components';
import { ScrollY } from '../../common/Utils/styles';

export const CurrencyMenuContainer = styled.div`
  position: relative;
  width: 38px;
  height: 29px;
  &,
  & > * {
    font-weight: var(--fw-medium);
  }
  line-height: 1.8;
`;
export const CurrencyMenuButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 0;

  :focus + ul {
    /* pointer-events is broken in React*/
    opacity: 1;
    /* pointer-events: all; */
  }

  :focus > img {
    transform: rotate(-180deg);
  }

  & > img {
    margin-left: 0.6em;
  }
`;
export const CurrencyMenuOptions = styled.ul`
  position: absolute;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1.25em;
  width: 114px;
  height: 169px;
  background-color: #ffffff;
  box-shadow: 0px 4px 35px 0px #a8acb030;
  z-index: 1000;
  transform: translate(-23px, 7.5px);
  opacity: 0;
  ${ScrollY}/* pointer-events: none; */
`;
export const CurrencyMenuOption = styled.li`
  cursor: pointer;
`;
