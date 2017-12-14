/**
 * Created by jmartinez on 12/11/17.
 */
import * as types from './constants';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import history from '../../config/history';

export function signupUserSuccess(token){
    localStorage.setItem('token', token);
    return {
        type: types.SIGNUP_SUCCESS_USER,
        payload: {
            token: token
        }
    }
}

export function signupUserFail(error){
    return {
        type: types.SIGNUP_FAIL_USER,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}




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

export const submitPasswordResetSuccess = () => {
    return {
        type: types.SUBMIT_PASSWORD_RESET_SUCCESS
    }
};

export const submitPasswordResetFail = (error) => {
    return {
        type: types.SUBMIT_PASSWORD_RESET_FAIL,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export const resetPasswordFail = (error) => {
    return {
        type: types.RESET_PASSWORD_FAIL,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
};

export const resetPasswordSuccess = () => {
    return {
        type: types.RESET_PASSWORD_SUCCESS
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
                    console.log(response);
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
};

export const submitPasswordReset = (email) => {
    return (dispatch) => {
        const data = {email: email};
        return makeUserRequest("post", data, "/api/passwordrequest")
            .then(response => {
                const success = response.data.success;
                if(success){
                    console.log(response.data.token);
                    dispatch(submitPasswordResetSuccess())
                }else{
                    dispatch(submitPasswordResetFail({
                        response: {
                            status: 403,
                            statusText: "Email address not found."
                        }
                    }))
                }
                
            })
            .catch(error => {
                dispatch(submitPasswordResetFail(error))
            });
    }
};

export const resetPassword = (token, password1, password2) => {
    return (dispatch) => {
        let data = {};
        console.log(password1);
        console.log(password2);
        console.log(password1 == password2)
        if(password1 == password2){
            console.log("match");
            data = {token: token, password: password1}
        }else{
            dispatch(resetPasswordFail({
                response: {
                    status: 403,
                    statusText: "Passwords do not match."
                }
            }));
            return;
        }
        return makeUserRequest("post", data, "/api/passwordreset")
            .then(response => {
                const success = response.data.success;
                if(success){
                    dispatch(resetPasswordSuccess());
                    
                }else{
                    dispatch(resetPasswordFail({
                        response: {
                            status: 403,
                            statusText: `Error resetting the password: ${response.data.reason}`
                        }
                    }))
                }
            })
            .catch(error => {
                dispatch(resetPasswordFail(error))
            })
    }
};

export function registerUser(email, password){
    const data = {email: email, password: password};
    return function(dispatch){
        return makeUserRequest("post", data, "/api/register")
            .then(response => {
                // dispatch(testSignUp(response.data.email))
            })
            .catch(error => {
                dispatch(signupUserFail(error))
            })
    }
}

