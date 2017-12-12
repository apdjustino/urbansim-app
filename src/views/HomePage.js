/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap'
import LogIn from '../components/LogIn';
import RequestNewPassword from '../components/RequestNewPassword';
import * as userActions from '../actions/users/users';

class HomePage extends React.Component{

    constructor(props){
        super(props);
    }
    
    handleLogin(values){
        this.props.loginUser(values.email, values.password);
    }

    handlePasswordRequest(e){
        e.preventDefault();
        this.props.togglePasswordReset(this.props.isReset)
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        {
                            (this.props.isReset ? <RequestNewPassword togglePwdReset={(e) =>{this.handlePasswordRequest(e)}}/> :
                            <LogIn onSubmit={(values) => {this.handleLogin(values)}}
                                   togglePwdReset={(e) => {this.handlePasswordRequest(e)}}/>
                            )
                        }
                        
                    </Col>
                </Row>
            </Container>
            )

    }

}

const mapStateToProps = (state) => {
    return {
        isReset: state.users.isReset
    };
};

export default withRouter(connect(mapStateToProps, userActions)(HomePage));