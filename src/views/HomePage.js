/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap'
import LogIn from '../components/LogIn';

class HomePage extends React.Component{

    handleLogin(values){
        console.log(values);
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

export default HomePage;