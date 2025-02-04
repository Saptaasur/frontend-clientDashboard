import React from 'react';
import ReactDOM from 'react-dom/client'; // New import for React 18
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root using createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
