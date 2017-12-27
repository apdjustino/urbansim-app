/**
 * Created by jmartinez on 12/19/17.
 */
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import DeleteUser from '../components/DeleteUser';
import * as userActions from '../actions/users/users';

class DeleteUserPage extends React.Component {
    constructor(props){
        super(props);
        //load the users from the database
        this.props.getUsers(localStorage.getItem('token'));
    }

    handleSubmit(values){
        const token = localStorage.getItem('token');
        this.props.deleteUser(token, values['delete-user']);

    }

    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <DeleteUser onSubmit={(values) => {this.handleSubmit(values)}} />
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

export default connect(mapStateToProps, userActions)(DeleteUserPage);