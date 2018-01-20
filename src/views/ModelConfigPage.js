/**
 * Created by jmartinez on 1/11/18.
 */
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import ModelConfig from '../components/ModelConfig';
import ModelRunning from '../components/ModelRunning';
import * as model_config from '../actions/model-config/model-config';
import io from 'socket.io-client';
import Denied from './Denied';



class ModelConfigPage extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }
    
    handleSubmit(values){
        this.props.submitModel(values);
    }
    
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <ModelConfig onSubmit={(values) => {this.handleSubmit(values)}} />
                        </Col>
                        <Col md={6}>
                            <ModelRunning />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    
};


const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, model_config)(ModelConfigPage);