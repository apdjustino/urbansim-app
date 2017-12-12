/**
 * Created by jmartinez on 12/11/17.
 */
import * as types from './constants';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import history from '../../config/history';


export const loginUserRequest = () => {
    return {
        type: types.LOGIN_USER_REQUEST
    }
};

export const togglePasswordReset = (isReset) => {
    return {
        type: types.TOGGLE_PASSWORD_RESET,
        payload: {
            isReset: !isReset
        }
    }
};

export const loginUserSuccess = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            email: email
        }
    }
};

export const loginUserFail = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    return {
        type: types.LOGIN_USER_FAIL,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    return {
        type: types.LOGOUT_USER
    }
};

export const isAuthenticated = (authenticated) => {
    return {
        type: types.IS_AUTHENTICATED,
        payload:{
            authenticated: authenticated
        }
    }
}

export const makeUserRequest = (method, data, url) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};

export const logOutUser = () => {
    return (dispatch) => {
        dispatch(logOut());
        history.push('/')
    }
};

export const loginUser = (email, password, redirect='/private') => {
    const data = {email: email, password: password};
    return (dispatch) => {
        dispatch(loginUserRequest());
        return makeUserRequest("post", data, "/api/login")
            .then(response => {
                try {
                    let decoded = jwtDecode(response.data.token);
                    dispatch(loginUserSuccess(response.data.token, decoded.email));
                    history.push(redirect);
                } catch(e){
                    dispatch(loginUserFail({
                        response: {
                            status: 403,
                            statusText: "Invalid Email and/or Password"
                        }
                    }));
                }

            })
            .catch(error => {
                dispatch(loginUserFail(error))
            })
    }
};

export const authenticate = (token) => {
    return function(dispatch){
        const data = {token: token};
        return makeUserRequest("post", data, "/api/authenticate")
            .then(response => {
                dispatch(isAuthenticated(response.data.authenticated))
            });
    }
}


