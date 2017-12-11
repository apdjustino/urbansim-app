/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button} from 'reactstrap'
import * as userActions from '../actions/users/users'

const PrivatePage = (props) => (
    <Container>
        <Jumbotron>
            <h1>This is a private page</h1>
            <h5>User: {props.email}</h5>
        </Jumbotron>
        <Button color="primary" onClick={() => {props.logOutUser()}}>Log Out</Button>
    </Container>
);

const mapStateToProps = (state) => {
    return {
        email: state.users.email
    }
};

export default connect(mapStateToProps, userActions)(PrivatePage)