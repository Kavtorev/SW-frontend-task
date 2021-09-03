import React from 'react';
import ImageCard from '../../common/ImageCard/ImageCard';
import { AttributeButton } from '../../components/AttributeButton';
import { ProductAdvancedTitle } from '../../components/ProductAdvancedTitle';
import { AttributeButtonsGroup } from '../../components/AttributeButtonsGroup';
import DOMPurify from 'dompurify';
import { Title } from '../../common/RobotoCondensedTitle/styles';
import { Price } from '../../components/Price';
import {
  CartButton,
  ProductDescription,
  ProductImageWrapper,
  ProductPageDetailsSide,
  ProductPageGallery,
  ProductPagePrimaryDetails,
  ProductPageWrapper,
} from './styles';
import { connector, PropsFromRedux } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { AddToCartButton } from '../../components/AddToCartButton';
import { OutOfStockHolder } from '../../components/OutOfStockHolder';

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

    const { gallery, brand, name, description, prices, inStock } = product;

    return (
      <section>
        <ProductPageWrapper>
          <ProductPageGallery>
            {gallery.map((imgSrc) => {
              return (
                <ImageCard
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
              <Title>Size:</Title>
              <AttributeButtonsGroup
                render={() => (
                  <>
                    <AttributeButton>XS</AttributeButton>
                    <AttributeButton selected>S</AttributeButton>
                    <AttributeButton>M</AttributeButton>
                    <AttributeButton>L</AttributeButton>
                  </>
                )}
              />
              <Price prices={prices} size={'large'} />
              {inStock && (
                <AddToCartButton
                  render={(handleClick) => {
                    return (
                      <CartButton onClick={() => handleClick(product)}>
                        Add to cart
                      </CartButton>
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
