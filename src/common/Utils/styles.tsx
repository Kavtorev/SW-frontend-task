import { css } from 'styled-components';

export const ScrollY = css`
  overflow-y: scroll;
  scrollbar-width: none;
  overflow-x: hidden;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollX = css`
  overflow-x: scroll;
  scrollbar-width: none;
  overflow-y: hidden;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollBoth = css`
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
