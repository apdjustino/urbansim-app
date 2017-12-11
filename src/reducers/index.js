/**
 * Created by jmartinez on 12/11/17.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import users from './users'

export default combineReducers({
    users,
    routing: routerReducer,
    form: formReducer
}); 