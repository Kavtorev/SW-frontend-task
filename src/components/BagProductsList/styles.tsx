import styled from 'styled-components';

export const BagProductsListWrapper = styled.ul`
  width: 85%;

  & > li {
    border-top: 1px solid #e5e5e5;
  }

  & .product_bag_item_quantity {
    font-size: var(--fs-m);
  }
`;

export const AttributeButtonsContainer = styled.div`
  margin-top: var(--m-s);
`;
