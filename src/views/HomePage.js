/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap'
import LogIn from '../components/LogIn';
import * as userActions from '../actions/users/users';

class HomePage extends React.Component{

    constructor(props){
        super(props);
    }
    
    handleLogin(values){
        console.log(values);
        this.props.loginUser(values.email, values.password);
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <LogIn onSubmit={(values) => {this.handleLogin(values)}} />
                    </Col>
                </Row>
            </Container>
            )

    }

}

const mapStateToProps = (state) => {
    return {};
};

export default withRouter(connect(mapStateToProps, userActions)(HomePage));