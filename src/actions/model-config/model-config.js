/**
 * Created by jmartinez on 1/11/18.
 */
import io from 'socket.io-client';
import * as types from './constants';
import history from '../../config/history';
import axios from 'axios';

const socket = io('http://localhost:5000/api/datetime');

export function subscribeToTimer(){

    socket.emit('subscribeToTime');
    socket.on('timer', function(x){ console.log(x);});
}


export const submitModelConfigSuccess = (res) => {
    return {
        type: types.SUBMIT_MODEL_CONFIG_SUCCESS,
        payload: {
            status: res.response.status,
            statusText: res.response.statusText
        }
    }
};

export const submitModelConfigFail = (res) => {
    return {
        type: types.SUBMIT_MODEL_CONFIG_FAIL,
        payload: {
            status: res.response.status,
            statusText: res.response.statusText
        }
    }
};

export const submitModelConfigRequest = (years) => {
    return {
        type: types.SUBMIT_MODEL_CONFIG_REQUEST,
        payload: {
            years: years
        }
    }
};

export const updateModelStatus = (res, year) => {
    let payloadObj = {};
    const yearId = `model${year}`;
    payloadObj[yearId] = res.response.statusText;
    
    return {
        type: types.UPDATE_MODEL_STATUS,
        payload: {
            status: res.response.status,
            statusText: res.response.statusText,
            obj: payloadObj
        }
    }
};

export const formError = (res) => {
    return {
        type: types.FORM_ERROR,
        payload: {
            status: res.response.status,
            statusText: res.response.statusText
        }
    }
}

export const submitModel = (values) => {
    return function(dispatch){

        if(!values.hasOwnProperty('model-select')){
            dispatch(formError({
                response: {
                    status: 400,
                    statusText: "*Required",
                    isValid: false
                }
            }));
            return;
        }else if(!values.hasOwnProperty('year-select')){
            dispatch(formError({
                response: {
                    status: 400,
                    statusText: "*Required",
                    isValid: false
                }
            }));
            return;
        }
        
        dispatch(submitModelConfigRequest(values['year-select']));

        const socket = io('http://localhost:5000/flask/api/runmodel', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: Infinity
        });
        
        
        socket.on('unauthorized', (msg) => {
            dispatch(submitModelConfigFail({
                response: {
                    status: 400,
                    statusText: msg
                }
            }))
        });
        
        socket.on('model_success', (msg) => {
            dispatch(submitModelConfigSuccess({
                response: {
                    status: 200,
                    statusText: msg
                }
            }))
        });

        socket.on('model2015', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2015))
        });
        socket.on('model2016', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2016))
        });
        socket.on('model2017', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2017))
        });
        socket.on('model2018', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2018))
        });
        socket.on('model2019', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2019))
        });
        socket.on('model2020', (msg) => {
            console.log(msg);
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2020))
        });
        socket.on('model2021', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2021))
        });
        socket.on('model2022', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2022))
        });
        socket.on('model2023', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2023))
        });
        socket.on('model2024', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2024))
        });
        socket.on('model2025', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2025))
        });
        socket.on('model2026', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2026))
        });
        socket.on('model2027', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2027))
        });
        socket.on('model2028', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2028))
        });
        socket.on('model2029', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2029))
        });
        socket.on('model2030', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2030))
        });
        socket.on('model2031', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2031))
        });
        socket.on('model2032', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2032))
        });
        socket.on('model2033', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2033))
        });
        socket.on('model2034', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2034))
        });
        socket.on('model2035', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2035))
        });
        socket.on('model2036', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2036))
        });
        socket.on('model2037', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2037))
        });
        socket.on('model2038', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2038))
        });
        socket.on('model2039', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2039))
        });
        socket.on('model2040', (msg) => {
            dispatch(updateModelStatus({
                response: {
                    status: 200,
                    statusText: msg
                }
            }, 2040))
        });

        socket.on('test_foreign', (msg) => {
            console.log(msg);
        });


        socket.emit('run_model', localStorage.getItem('token'), values);
    }
};

