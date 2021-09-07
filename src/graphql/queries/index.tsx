import { gql } from '@apollo/client';

export const GET_INITIAL_DATA = gql`
  query GetInitialData {
    categories {
      name
    }
    currencies
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_NAME = gql`
  query GetProductsByCategoryName($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
        id
        category
        name
        brand
        inStock
        description
        gallery
        prices {
          currency
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  }
`;
