import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers/index';


const middleware = [thunkMiddleware];

const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(rootReducer);


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
