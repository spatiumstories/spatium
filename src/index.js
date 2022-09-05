import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import React from 'react';
import store from './store';

ReactDOM.render(<HashRouter><Provider store={store}><App/></Provider></HashRouter>, document.getElementById('root'));