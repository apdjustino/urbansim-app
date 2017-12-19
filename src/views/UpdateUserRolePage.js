/**
 * Created by jmartinez on 12/18/17.
 */

import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import UpdateUserRole from '../components/UpdateUserRole';
import * as userActions from '../actions/users/users';

class UpdateUserRolePage extends React.Component {
    constructor(props){
        super(props);
        //load the users from the database
        this.props.getUsers(localStorage.getItem('token'));
    }

    handleSubmit(values){
        const token = localStorage.getItem('token');
        this.props.updateUserRole(token, values['user-select'], values['role-select']);
        
    }

    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <UpdateUserRole onSubmit={(values) => {this.handleSubmit(values)}} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, userActions)(UpdateUserRolePage);
