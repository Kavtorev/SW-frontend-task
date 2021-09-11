import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { ProductCard } from '../ProductCard';
import { ProductsListContainer, InvisibleProductCard } from './styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { nanoid } from 'nanoid';

interface MathProps {
  id: string;
}
interface Props extends PropsFromRedux, RouteComponentProps<MathProps> {}

class ProductsList extends React.Component<Props> {
  handleProductCardClick = (id: string) => {
    this.props.history.push(`/details/${id}`);
  };

  render() {
    const { selectedCategory, fetchedProducts } = this.props;

    const filteredProducts =
      selectedCategory === 'all'
        ? fetchedProducts
        : fetchedProducts.filter(
            (product) => product.category === selectedCategory
          );

    const renderedProducts = filteredProducts.map((product) => {
      return (
        <ProductCard
          key={nanoid()}
          product={product}
          handleOnClick={this.handleProductCardClick}
        />
      );
    });

    if (window.innerWidth >= 1380 && filteredProducts.length % 3) {
      renderedProducts.push(<InvisibleProductCard key={nanoid()} />);
    }

    return <ProductsListContainer>{renderedProducts}</ProductsListContainer>;
  }
}

export default connector(withRouter(ProductsList));
