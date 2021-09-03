import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Apollo } from './graphql';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Apollo>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Apollo>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
