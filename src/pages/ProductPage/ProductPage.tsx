import React from 'react';
import { ImageCard } from '../../common';
import DOMPurify from 'dompurify';
import {
  CartButton,
  ProductDescription,
  ProductImageWrapper,
  ProductPageDetailsSide,
  ProductPageGallery,
  ProductPagePrimaryDetails,
  ProductPageWrapper,
  AttributeButtonsContainer,
} from './styles';
import { connector, PropsFromRedux } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import {
  AddToCartButton,
  OutOfStockHolder,
  ProductAdvancedTitle,
  AttributeButtonsGroupLocal,
  AttributeButton,
  Price,
} from '../../components';
import { nanoid } from 'nanoid';
import { IAttribute, IAttributeSet, IProduct } from '../../shared';

interface MatchProps {
  id: string;
}

interface Props extends PropsFromRedux, RouteComponentProps<MatchProps> {}

class ProductPage extends React.Component<Props> {
  componentDidMount() {
    const { fetchProductById, match } = this.props;
    fetchProductById(match.params.id);
  }

  findProductById = (id: string) =>
    this.props.fetchedProducts.find((prod: IProduct) => prod.id === id);

  render() {
    const {
      fetchedProduct,
      productLoading,
      productError,
      selectGalleryImage,
      selectedGalleryImageSrc,
    } = this.props;

    if (productLoading) return <h1>Please wait product is loading...</h1>;
    if (productError)
      return (
        <h1>
          Either product doesn't exist or you are experiencing connection
          problems
        </h1>
      );

    const {
      gallery,
      brand,
      name,
      description,
      prices,
      inStock,
      attributes,
      id,
    } = fetchedProduct;

    const renderedProductGallery = gallery.map((imgSrc: string) => (
      <ImageCard
        key={nanoid()}
        src={imgSrc}
        imageBodyClassName='imageBody__product_page_gallery'
        handleOnMouseOver={() => selectGalleryImage(imgSrc)}
      />
    ));

    const productHeroImageRender = !inStock && (
      <OutOfStockHolder>Out of stock</OutOfStockHolder>
    );

    const renderAttributeItems = (
      type: IAttributeSet['type'],
      items: IAttribute[],
      handleSelection: (itemId: IAttribute['id']) => void,
      selectedItemId: IAttribute['id']
    ) => (
      <>
        {items.map((item: IAttribute) => {
          return (
            <AttributeButton
              key={nanoid()}
              selected={selectedItemId === item.id}
              value={item.value}
              attributeType={type}
              handleClick={() => handleSelection(item.id)}
            >
              {item.displayValue}
            </AttributeButton>
          );
        })}
      </>
    );

    const renderedAttributeSet = attributes.map((set: IAttributeSet) => {
      return (
        <AttributeButtonsContainer key={nanoid()}>
          <AttributeButtonsGroupLocal
            name={set.name}
            productId={id}
            attributeId={set.id}
            render={(handleSelection, selectedItemId) =>
              renderAttributeItems(
                set.type,
                set.items,
                handleSelection,
                selectedItemId
              )
            }
          />
        </AttributeButtonsContainer>
      );
    });

    const addToCartButton = inStock && (
      <AddToCartButton
        product={fetchedProduct}
        render={(handleClick) => {
          return <CartButton onClick={handleClick}>Add to cart</CartButton>;
        }}
      />
    );

    const sanitizedDescription = {
      __html: DOMPurify.sanitize(description),
    };

    return (
      <section>
        <ProductPageWrapper>
          <ProductPageGallery>{renderedProductGallery}</ProductPageGallery>
          <ProductPageDetailsSide>
            <ProductImageWrapper>
              <ImageCard
                src={selectedGalleryImageSrc}
                imageBodyClassName='imageBody__product__page'
                render={() => <>{productHeroImageRender}</>}
              />
            </ProductImageWrapper>
            <ProductPagePrimaryDetails>
              <ProductAdvancedTitle
                brand={brand}
                name={name}
                className='mb_product_advanced_title'
              />
              {renderedAttributeSet}
              <Price
                prices={prices}
                size={'large'}
                className='m_product_price'
              />
              {addToCartButton}
              <ProductDescription
                dangerouslySetInnerHTML={sanitizedDescription}
              />
            </ProductPagePrimaryDetails>
          </ProductPageDetailsSide>
        </ProductPageWrapper>
      </section>
    );
  }
}

export default connector(ProductPage);
