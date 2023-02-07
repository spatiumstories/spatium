import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';


import App from './App';
import React from 'react';
import store from './store';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HashRouter><Provider store={store}><App/></Provider></HashRouter>);