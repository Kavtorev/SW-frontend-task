import { gql } from '@apollo/client';

const CORE_PRODUCT_FIELDS = gql`
  fragment CoreProductFields on Product {
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
`;

export const GET_INITIAL_DATA = gql`
  query GetInitialData {
    categories {
      name
    }
    currencies
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_NAME = gql`
  ${CORE_PRODUCT_FIELDS}
  query GetProductsByCategoryName($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
        ...CoreProductFields
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  ${CORE_PRODUCT_FIELDS}
  query GetProductById($productId: String!) {
    product(id: $productId) {
      ...CoreProductFields
    }
  }
`;
