import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { CartPage, CategoryPage, ProductPage } from './pages';
import { Normalize } from 'styled-normalize';
import { StyledContainer, Header, CartOverlay } from './components';
import { connector, PropsFromRedux } from './store';

interface Props extends PropsFromRedux {}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    const { isCartPopperOpen, initialDataLoading, initialDataError } =
      this.props;

    if (initialDataLoading) {
      return <h1>...</h1>;
    }

    if (initialDataError) {
      <h1>Refresh the page...</h1>;
    }
    return (
      <>
        <GlobalStyle />
        <Normalize />
        <Header />
        {isCartPopperOpen && <CartOverlay />}
        <StyledContainer>
          <Switch>
            <Route path='/cart' component={CartPage} />
            <Route path='/:category' exact component={CategoryPage} />
            <Route path='/details/:id' component={ProductPage} />
            <Redirect push={true} to='/all' />
          </Switch>
        </StyledContainer>
      </>
    );
  }
}

export default connector(App);
