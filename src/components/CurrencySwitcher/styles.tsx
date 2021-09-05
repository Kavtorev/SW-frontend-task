import styled from 'styled-components';
import { ScrollY } from '../../common';

export const CurrencyMenuContainer = styled.div`
  position: relative;
  height: 29px;
  &,
  & > * {
    font-weight: var(--fw-medium);
  }
  line-height: 1.8;
`;
export const CurrencyMenuButton = styled.button<{ isMenuOpened: boolean }>`
  background-color: transparent;
  cursor: pointer;
  border: 0;

  :focus > img {
    transform: ${(props) =>
      props.isMenuOpened ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }

  & > img {
    margin-left: 0.6em;
  }
`;

export const CurrencyMenuOptionsWrapper = styled.div`
  position: absolute;
  transform: translate(-23px, 7.5px);
  height: 170px;
  background-color: #ffffff;
  box-shadow: 0px 4px 35px 0px #a8acb030;
  ${ScrollY};
`;

export const CurrencyMenuOptions = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1.25em;
  width: 114px;
  background-color: #ffffff;

  z-index: 1000;
  padding: 1.25em 0 0 1.25em;

  & > li {
    padding-bottom: 1.25em;
  }
`;
export const CurrencyMenuOption = styled.li`
  cursor: pointer;
`;
