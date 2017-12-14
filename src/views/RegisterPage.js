/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import RegisterUser from '../components/RegisterUser';
import * as userActions from '../actions/users/users';


class RegisterPage extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    
    handleSubmit(values){
        console.log(values);
        this.props.registerUser(values['register-email'], values['register-password1']);
    }
    
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <RegisterUser onSubmit={(values) => {this.handleSubmit(values)}} />
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

export default connect(mapStateToProps, userActions)(RegisterPage);