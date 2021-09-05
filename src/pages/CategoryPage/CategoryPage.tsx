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
    const { selectCategory } = this.props;
    const category = this.findCategoryByMatch();
    selectCategory(category?.name || 'all');
  }

  componentDidUpdate(prevProps: Props) {
    const { match, selectCategory } = this.props;
    if (prevProps.match.params.category !== match.params.category) {
      const category = this.findCategoryByMatch();
      selectCategory(category?.name || 'all');
    }
  }

  findCategoryByMatch = () => {
    const { categories, match } = this.props;
    return categories.find((cat) => cat.name === match.params.category);
  };

  render() {
    const { selectedCategory } = this.props;

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
