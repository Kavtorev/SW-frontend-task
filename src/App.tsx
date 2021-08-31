import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { CartPage, ProductDescriptionPage, ProductListingPage } from './pages';
import { Normalize } from 'styled-normalize';

function App() {
  return (
    <div className=''>
      <GlobalStyle />
      <Normalize />
      <h1>Header!</h1>
      <Switch>
        <Route path='/' exact component={ProductListingPage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/details/:id' component={ProductDescriptionPage} />
      </Switch>
    </div>
  );
}

export default App;
