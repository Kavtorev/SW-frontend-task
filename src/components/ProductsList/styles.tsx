import styled from 'styled-components';

export const ProductsListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(386px, 1fr));
  justify-content: space-between;
  gap: 2.5rem;
`;
