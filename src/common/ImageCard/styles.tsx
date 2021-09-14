import styled from 'styled-components';

export type ImageBodyClassNames =
  | ''
  | 'imageBody__product__card'
  | 'imageBody__product__image__carousel'
  | 'imageBody__product__page'
  | 'imageBody__cart__product__item'
  | 'imageBody__product_page_gallery';

export type ImageClassNames =
  | ''
  | 'image__product__image__carousel'
  | 'image__cart__product__item';

export const ImageWrapper = styled.div`
  &.imageBody__product__card {
    width: 354px;
    height: 330px;
    position: relative;
  }

  &.imageBody__product__image__carousel {
    width: 140px;
    height: 100%;
    position: relative;
  }

  &.imageBody__product__page {
    width: 610px;
    height: 510px;
    position: relative;
    cursor: pointer;
  }

  &.imageBody__product_page_gallery {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  &.imageBody__cart__product__item {
    width: 105px;
    height: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  &.image__product__image__carousel {
    object-fit: contain;
  }

  &.image__cart__product__item {
    object-fit: contain;
  }
`;
