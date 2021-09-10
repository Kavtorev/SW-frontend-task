import styled from 'styled-components';

export const ProductBagItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1.25em 0;
`;
export const ProductBagItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ProductBagItemRight = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ProductBagItemSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: var(--m-xs);
`;

const setButtonDefaults = styled.button`
  background-color: transparent;
  border: 0;
  display: flex;
  cursor: pointer;
`;

export const ProductBagItemIncreaseButton = styled(setButtonDefaults)``;
export const ProductBagItemDecreaseButton = styled(setButtonDefaults)``;
export const ProductBagItemQuantity = styled.span``;
