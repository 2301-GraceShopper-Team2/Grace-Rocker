import React from 'react';
// Import our custom CSS
import './scss/style.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
