/**
 * Created by jmartinez on 12/11/17.
 */
import * as types from '../actions/users/constants';

const users = (state = {
    authenticated: false,
    token: null,
    email: null,
    statusText: null
}, action) => {
    switch(action.type) {
        case types.LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {token: action.payload.token, email: action.payload.email});
        case types.LOGIN_USER_FAIL:
            return Object.assign(
                {},
                state,
                {statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`}
            );
        case types.IS_AUTHENTICATED:
            return Object.assign({}, state, {authenticated: action.payload.authenticated});
        case types.LOGOUT_USER:
            return Object.assign({}, state, {authenticated: false});
        default:
            return state
    }
};

export default users;