/**
 * Created by jmartinez on 1/11/18.
 */
import * as types from '../actions/model-config/constants';

const model_config = (state = {
    modelIsRunning: false,
    statusText: null,
    authText: null,
    successText: null,
    isValid: null,
    formFeedBack: null,
    yearsRunning: [],
    model2015: null,
    model2016: null,
    model2017: null,
    model2018: null,
    model2019: null,
    model2020: null,
    model2021: null,
    model2022: null,
    model2023: null,
    model2024: null,
    model2025: null,
    model2026: null,
    model2027: null,
    model2028: null,
    model2029: null,
    model2030: null,
    model2031: null,
    model2032: null,
    model2033: null,
    model2034: null,
    model2035: null,
    model2036: null,
    model2037: null,
    model2038: null,
    model2039: null,
    model2040: null,
    
}, action) => {
    switch(action.type){
        case types.SUBMIT_MODEL_CONFIG_FAIL:
            return Object.assign({}, state, {successText: action.payload.statusText, modelIsRunning: false});
        case types.SUBMIT_MODEL_CONFIG_REQUEST:
            return Object.assign({}, state, {modelIsRunning: true, yearsRunning: action.payload.years});
        case types.SUBMIT_MODEL_CONFIG_SUCCESS:
            return Object.assign({}, state, {successText: action.payload.statusText, modelIsRunning: false});
        case types.UPDATE_MODEL_STATUS:
            return Object.assign({}, state, action.payload.obj);
        case types.FORM_ERROR:
            return Object.assign({}, state, {formFeedBack: action.payload.statusText, isValid: false});
        default:
            return state
    }
};

export default model_config;