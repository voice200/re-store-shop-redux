import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boundry';
import BookstoreService from './services/bookstore-service';
import { BooksStoreServiceProvider } from './components/bookstore-service-context';

import store from './store';

const booksStoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
	 <ErrorBoundary>
       <BooksStoreServiceProvider value={booksStoreService}>
         <Router>
           <App/>
         </Router>
       </BooksStoreServiceProvider>
     </ErrorBoundary>
  </Provider>,
    document.getElementById('root')
);

