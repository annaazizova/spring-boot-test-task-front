import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import App from './App';
import LoginPage from './components/LoginPage';

const store = configureStore();
render(
    <Provider store={store}>
        <LoginPage />
    </Provider>,
    document.getElementById('root')
);