/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap'

const HomePage = (props) => (
    <Container>
        <Row>
            <Col md={12}>
                <h1>Login page goes here</h1>
            </Col>
        </Row>
    </Container>
);

export default HomePage;