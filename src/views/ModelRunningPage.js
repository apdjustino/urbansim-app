/**
 * Created by jmartinez on 1/13/18.
 */
import React, {Component} from 'react'
import * as model_config from '../actions/model-config/model-config';
import io from 'socket.io-client';
import {connect} from 'react-redux';

class ModelRunningPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: ""
        };

    }

    componentDidMount(){

    }


    handleButton(){
        const socket = io('http://localhost:5000/flask/api/runmodel', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: Infinity
        });
        socket.on('model_status', (msg) => {
            this.setState({
                time: msg
            });
            console.log(msg);
        });

        socket.on('token_info', (msg) => {
            console.log(msg);
        });
        
        socket.emit('run_model', localStorage.getItem('token'));
    }


    render(){
        return (
            <div>
                <h1>Time stamp: {this.state.time}</h1>
                <button onClick={() => {this.handleButton()}}>Test</button>
            </div>
        )
    }


}

export default ModelRunningPage;