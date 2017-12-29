import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import history from './config/history';
import Authenticated from './components/Authenticated'
import HomePage from './views/HomePage';
import PrivatePage from './views/PrivatePage';
import ResetPassword from './views/ResetPassword';
import RegisterPage from './views/RegisterPage';
import UpdateUserRolePage from './views/UpdateUserRolePage';
import DeleteUser from './views/DeleteUser'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const App = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/private" render={ props => (<Authenticated component={PrivatePage} {...props}/>)} />
                <Route exact path="/reset-password/:_token" component={ResetPassword} />
                <Route exact path="/register" render={ props => (<Authenticated component={RegisterPage} {...props}/>)} />
                <Route exact path="/updaterole" render={ props => (<Authenticated component={UpdateUserRolePage} {...props}/>)} />
                <Route exact path="/deleteuser" render={ props => (<Authenticated component={DeleteUser} {...props}/>)} />
            </div>
        </Router>
    </Provider>

);


export default App;

