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
  AttributeButtonsGroup,
  AttributeButton,
  Price,
} from '../../components';
import { nanoid } from 'nanoid';

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
    return this.props.fetchedProducts.find((prod) => prod.id === id);
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

    return (
      <section>
        <ProductPageWrapper>
          <ProductPageGallery>
            {gallery.map((imgSrc) => {
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
            })}
          </ProductPageGallery>
          <ProductPageDetailsSide>
            <ProductImageWrapper>
              <ImageCard
                src={this.state.selectedImage}
                width='610px'
                height='510px'
                styleBody={{ position: 'relative', cursor: 'pointer' }}
                render={() => {
                  return (
                    <>
                      {inStock ? (
                        <></>
                      ) : (
                        <OutOfStockHolder>Out of stock</OutOfStockHolder>
                      )}
                    </>
                  );
                }}
              />
            </ProductImageWrapper>
            <ProductPagePrimaryDetails>
              <ProductAdvancedTitle brand={brand} name={name} />
              {attributes.map((set) => {
                return (
                  <AttributeButtonsContainer key={nanoid()}>
                    <AttributeButtonsGroup
                      name={set.name}
                      showName={true}
                      productId={id}
                      attributeId={set.id}
                      render={(handleSelection, selectedItemId) => {
                        return (
                          <>
                            {set.items.map((item) => {
                              return (
                                <AttributeButton
                                  key={nanoid()}
                                  selected={selectedItemId === item.id}
                                  value={item.value}
                                  attributeType={set.type}
                                  handleClick={() =>
                                    handleSelection()(id, set.id, item.id)
                                  }
                                >
                                  {item.displayValue}
                                </AttributeButton>
                              );
                            })}
                          </>
                        );
                      }}
                    />
                  </AttributeButtonsContainer>
                );
              })}

              <Price prices={prices} size={'large'} />
              {inStock && (
                <AddToCartButton
                  product={product}
                  render={(handleClick) => {
                    return (
                      <CartButton onClick={handleClick}>Add to cart</CartButton>
                    );
                  }}
                />
              )}
              <ProductDescription
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            </ProductPagePrimaryDetails>
          </ProductPageDetailsSide>
        </ProductPageWrapper>
      </section>
    );
  }
}

export default connector(ProductPage);
