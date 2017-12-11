import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import history from './config/history';
import HomePage from './views/HomePage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const App = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={HomePage} />
            </div>
        </Router>
    </Provider>

);


export default App;

