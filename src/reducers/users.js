/**
 * Created by jmartinez on 12/11/17.
 */
import * as types from '../actions/users/constants';

const users = (state = {
    authenticated: false,
    token: null,
    email: null,
    statusText: null,
    isValid: null,
    isReset: false,
    pwdResetEmailIsValid: null,
    isLoading: false,
    isAdmin: false,
    roleOptions: types.roleOptions,
    currentUsers: []
}, action) => {
    switch(action.type) {
        case types.LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {token: action.payload.token, email: action.payload.email, isValid: null});
        case types.LOGIN_USER_FAIL:
            return Object.assign(
                {},
                state,
                {statusText: `${action.payload.statusText}`, isValid: false}
            );
        case types.IS_AUTHENTICATED:
            return Object.assign({}, state, {authenticated: action.payload.authenticated, isAdmin: action.payload.isAdmin});
        case types.LOGOUT_USER:
            return Object.assign({}, state, {authenticated: false});
        case types.TOGGLE_PASSWORD_RESET:
            return Object.assign({}, state, {isReset: action.payload.isReset});
        case types.SUBMIT_PASSWORD_RESET_FAIL:
            return Object.assign({}, state, {pwdResetEmailIsValid: false, statusText: `${action.payload.statusText}`, isLoading: false});
        case types.SUBMIT_PASSWORD_RESET_REQUEST:
            return Object.assign({}, state, {isLoading: true});
        case types.SUBMIT_PASSWORD_RESET_SUCCESS:
            return Object.assign({}, state, {pwdResetEmailIsValid: true, statusText: action.payload.statusText, isLoading: false});
        case types.RESET_PASSWORD_FAIL:
            return Object.assign({}, state, {isValid: false, statusText: action.payload.statusText});
        case types.SIGNUP_USER:
            return Object.assign({}, state, {isLoading: true});
        case types.SIGNUP_USER_FAIL:
            return Object.assign({}, state, {isLoading: false, isValid: false, statusText: action.payload.statusText});
        case types.SIGNUP_USER_SUCCESS:
            return Object.assign({}, state, {isLoading: false, isValid: true, statusText: action.payload.statusText});
        case types.LOAD_CURRENT_USERS:
            return Object.assign({}, state, {currentUsers: action.payload.currentUsers});
        case types.UPDATE_ROLE_FAIL:
            return Object.assign({}, state, {isValid: false, statusText: action.payload.statusText});
        case types.UPDATE_ROLE_SUCCESS:
            return Object.assign({}, state, {isValid: true, statusText: "User role successfully updated"});
        case types.RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, {token: action.payload.token, email: action.payload.email, isValid: null});
        default:
            return state
    }
};

export default users;