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
    this.handleCategorySelected();
    this.handleCategoryFilter();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.handleCategoryFilter();
    }
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.handleCategorySelected();
    }
  }

  handleCategoryFilter = () => {
    const categoryName = this.findCategoryNameByParamMatch() || 'all';
    this.props.fetchProductsByCategoryName(
      categoryName === 'all' ? '' : categoryName
    );
  };

  handleCategorySelected = () => {
    const categoryName = this.findCategoryNameByParamMatch();
    if (categoryName) {
      this.props.selectCategory(categoryName);
    }
  };

  findCategoryNameByParamMatch = () => {
    const { categories, match } = this.props;

    const foundCategory = categories.find(
      (cat) => cat.name === match.params.category
    );

    return foundCategory?.name;
  };

  render() {
    const { selectedCategory, categoryProductsLoading } = this.props;

    if (categoryProductsLoading) {
      return <h1>Please wait products are loading...</h1>;
    }

    const title =
      selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

    return (
      <section>
        <CategoryPageTitle>{title}</CategoryPageTitle>
        <ProductsListWrapper>
          <ProductsList />
        </ProductsListWrapper>
      </section>
    );
  }
}

export default connector(CategoryPage);
