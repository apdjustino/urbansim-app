import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import history from './config/history';
import Authenticated from './components/Authenticated'
import HomePage from './views/HomePage';
import PrivatePage from './views/PrivatePage';
import ResetPassword from './views/ResetPassword';
import RegisterPage from './views/RegisterPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const App = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/private" render={ props => (<Authenticated component={PrivatePage} {...props}/>)} />
                <Route exact path="/reset-password/:_token" component={ResetPassword} />
                <Route exact path="/register" component={RegisterPage} />
            </div>
        </Router>
    </Provider>

);


export default App;

