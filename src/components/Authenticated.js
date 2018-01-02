/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/users/users'
import Denied from '../views/Denied'

class Authenticated extends React.Component{

    constructor(props){
        super(props);
        const token = localStorage.getItem('token');
        if(token){
            this.props.authenticate(token)
        }
    }



    render(){
        if(this.props.isAuth){
            return React.createElement(this.props.component, {...this.props});
        }else{
            return <Denied />
        }
    }

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.users.authenticated,
        
    };
};

export default connect(
    mapStateToProps,
    userActions
)(Authenticated);