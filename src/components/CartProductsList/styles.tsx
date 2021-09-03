import styled from 'styled-components';
import { ScrollY } from '../../common/Utils/styles';

export const CartProductsListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 300px;
  ${ScrollY}
`;
