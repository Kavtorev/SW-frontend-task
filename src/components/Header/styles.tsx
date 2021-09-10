import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
  max-width: var(--container-width);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const Navigation = styled.nav`
  height: 100%;
`;

export const List = styled.ul`
  height: inherit;
  & > li {
    display: inline-block;
    text-transform: uppercase;
    margin-right: var(--m-s);
    height: 100%;
    text-align: center;
    width: 97px;
    line-height: 1.1875;
    cursor: pointer;
  }
`;

export const Item = styled.li`
  & > a {
    display: block;
    height: 100%;
    text-decoration: none;
    color: var(--c-black);
    padding-top: calc(var(--p-l) + 0.5em);
  }
`;

export const LogoWrapper = styled.span`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-60%, -50%);
`;

export const LogoImage = styled.img``;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-left: 1.375em;
  }
`;
