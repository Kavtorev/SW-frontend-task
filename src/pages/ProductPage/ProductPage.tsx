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

interface State {
  selectedImage: string;
}

interface Props extends PropsFromRedux, RouteComponentProps<MatchProps> {}

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedImage: '',
    };
  }

  componentDidMount() {
    const product = this.findProductById(this.props.match.params.id);

    if (product) {
      this.setState({ selectedImage: product.gallery[0] });
    }
  }

  findProductById = (id: string) => {
    return this.props.fetchedProducts.find((prod: IProduct) => prod.id === id);
  };

  handleImageSelection = (imageSrc: string) =>
    this.setState({ selectedImage: imageSrc });

  render() {
    const { history, match } = this.props;
    const product = this.findProductById(match.params.id);

    if (!product) {
      history.push('/all');
      return <></>;
    }

    const {
      gallery,
      brand,
      name,
      description,
      prices,
      inStock,
      attributes,
      id,
    } = product;

    const renderedProductGallery = gallery.map((imgSrc: string) => {
      return (
        <ImageCard
          key={nanoid()}
          src={imgSrc}
          width='80px'
          height='80px'
          styleBody={{ cursor: 'pointer' }}
          handleClick={() => this.handleImageSelection(imgSrc)}
        />
      );
    });

    const productHeroImageRender = inStock && (
      <OutOfStockHolder>Out of stock</OutOfStockHolder>
    );

    const productHeroImageOverridenStyleBody: React.CSSProperties = {
      position: 'relative',
      cursor: 'pointer',
    };

    const renderAttributeItems = (
      type: IAttributeSet['type'],
      items: IAttribute[],
      handleSelection: (itemId: IAttribute['id']) => void,
      selectedItemId: IAttribute['id']
    ) => {
      return (
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
    };

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
        product={product}
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
                src={this.state.selectedImage}
                width='610px'
                height='510px'
                styleBody={productHeroImageOverridenStyleBody}
                render={() => <>{productHeroImageRender}</>}
              />
            </ProductImageWrapper>
            <ProductPagePrimaryDetails>
              <ProductAdvancedTitle brand={brand} name={name} />
              {renderedAttributeSet}
              <Price prices={prices} size={'large'} />
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
