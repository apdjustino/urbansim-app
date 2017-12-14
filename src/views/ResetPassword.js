/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import ResetPasswordForm from '../components/ResetPasswordForm';
import * as userActions from '../actions/users/users';



class ResetPassword extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    handleSubmit(values){
        console.log(values);
        const token = this.props.match.params._token;
        this.props.resetPassword(token, values["reset-password1", values["reset-password2"]]);
    }
    
    
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <ResetPasswordForm onSubmit={(values) => {this.handleSubmit(values)}} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, userActions)(ResetPassword);