import React from 'react';
import { connector, PropsFromRedux } from '../../store';
import { ProductCard } from '../ProductCard';
import { ProductsListContainer } from './styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MathProps {
  id: string;
}
interface Props extends PropsFromRedux, RouteComponentProps<MathProps> {}

class ProductsList extends React.Component<Props> {
  handleProductCardClick = (id: string) => {
    const { history } = this.props;
    history.push(`/details/${id}`);
  };

  render() {
    const { selectedCategory, fetchedProducts } = this.props;
    const filteredProducts =
      selectedCategory === 'all'
        ? fetchedProducts
        : fetchedProducts.filter(
            (product) => product.category === selectedCategory
          );

    const renderedProducts = filteredProducts.map((product, idx) => {
      return (
        <ProductCard
          key={product.id}
          product={product}
          handleOnClick={this.handleProductCardClick}
        />
      );
    });

    if (renderedProducts.length % 3 !== 0)
      renderedProducts.push(
        <li
          style={{
            width: '386px',
            height: '444px',
            backgroundColor: 'transparent',
            listStyle: 'none',
          }}
        />
      );

    return <ProductsListContainer>{renderedProducts}</ProductsListContainer>;
  }
}

export default connector(withRouter(ProductsList));
