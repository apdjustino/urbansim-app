/**
 * Created by jmartinez on 12/11/17.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import users from './users'
import model_config from './model-config'

export default combineReducers({
    users,
    model_config,
    routing: routerReducer,
    form: formReducer
}); 