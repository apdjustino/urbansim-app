/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron, Button} from 'reactstrap'
import * as userActions from '../actions/users/users'

const PrivatePage = (props) => {

    return (
        <Container>
            <Jumbotron>
                <h1>This is a private page</h1>
                <h5>User: {props.email}</h5>
            </Jumbotron>
            <Button color="primary" onClick={() => {props.logOutUser()}}>Log Out</Button> {' '}
            {(props.isAdmin ? <Button href="/register" color="primary">Add New User</Button> : <div></div>)} {' '}
            {(props.isAdmin ? <Button href="/updaterole" color="primary">Change User Role</Button> : <div></div>)} {' '}
            {(props.isAdmin ? <Button href="/deleteuser" color="primary">Delete User</Button> : <div></div>)} {' '}
        </Container>
    )
}

;

const mapStateToProps = (state) => {
    return {
        email: state.users.email
    }
};

export default connect(mapStateToProps, userActions)(PrivatePage)