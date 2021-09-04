import { css } from 'styled-components';

export const ScrollY = css`
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const ScrollX = css`
  overflow-x: scroll;
  scrollbar-width: none;
`;

export const ScrollBoth = css`
  overflow: scroll;
  scrollbar-width: none;
`;

export const Truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
