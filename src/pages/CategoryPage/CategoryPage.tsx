import React from 'react';
import { PropsFromRedux } from '../../store';
import { CategoryPageTitle, ProductsListWrapper } from './styles';
import { connector } from '../../store';
import { RouteComponentProps } from 'react-router';
import { ProductsList } from '../../components';

interface MatchParams {
  category: string;
}

interface Props extends PropsFromRedux, RouteComponentProps<MatchParams> {}

class CategoryPage extends React.Component<Props> {
  componentDidMount() {
    const { fetchProductsByCategoryName } = this.props;
    const categoryName = this.findCategoryNameByParamMatch();
    fetchProductsByCategoryName(categoryName);
    console.log(this.findCategoryNameByParamMatch());
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      const { fetchProductsByCategoryName } = this.props;
      const categoryName = this.findCategoryNameByParamMatch();
      fetchProductsByCategoryName(categoryName);
      console.log(this.findCategoryNameByParamMatch());
    }
  }

  findCategoryNameByParamMatch = () => {
    const { categories, match } = this.props;

    const foundCategory = categories.find(
      (cat) => cat.name === match.params.category
    );

    if (!foundCategory || foundCategory.name === 'all') {
      return '';
    }

    return foundCategory.name;
  };

  render() {
    const { selectedCategory, categoryProductsDataLoading } = this.props;

    if (categoryProductsDataLoading) {
      return <h1>Please wait products are loading...</h1>;
    }
    return (
      <section>
        <CategoryPageTitle>
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </CategoryPageTitle>
        <ProductsListWrapper>
          <ProductsList />
        </ProductsListWrapper>
      </section>
    );
  }
}

export default connector(CategoryPage);
