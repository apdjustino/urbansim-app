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
    pwdResetEmailIsValid: null
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
            return Object.assign({}, state, {authenticated: action.payload.authenticated});
        case types.LOGOUT_USER:
            return Object.assign({}, state, {authenticated: false});
        case types.TOGGLE_PASSWORD_RESET:
            return Object.assign({}, state, {isReset: action.payload.isReset});
        default:
            return state
    }
};

export default users;