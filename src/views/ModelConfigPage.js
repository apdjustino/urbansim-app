/**
 * Created by jmartinez on 1/11/18.
 */
import React, {Component} from 'react';
import {Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {connect} from 'react-redux'
import ModelConfig from '../components/ModelConfig';
import ModelRunning from '../components/ModelRunning';
import * as model_config from '../actions/model-config/model-config';
import history from '../config/history';
import io from 'socket.io-client';
import Denied from './Denied';



class ModelConfigPage extends React.Component {
    
    constructor(props){
        super(props);

        const token = localStorage.getItem('token');
        this.props.hasResources(token);
        
    }
    
    
    handleSubmit(values){
        this.props.submitModel(values);
    }

    handleCancel(){
        history.push('/private')
    }

    handleProvision(){
        const token = localStorage.getItem('token');
        if(this.props.noResources){
            this.props.submitEC2Request(token)
        }else{
            this.props.closeModal()
        }

    }

    handleTerminate(){
        const token = localStorage.getItem('token');
        this.props.shutDownResources(token);
        history.push('/private');
    }
    
    render(){
        const resourceText = "This account currently has AWS resources provisioned for UrbanSim. Resources stay active for 1 hour after they are provisioned. If the AWS resources expire during your modeling session, re-load this page and re-provision new resources."
        const noResourceText = "UrbanSim requires cloud resources to run the model. There are no resources allocated for this user. Each user will be able to use AWS resources to run the UrbanSim model. AWS resources will be able to run up to 30 years of model simulations simultaneously. To provision the resources, please click on the start button. Each user's resources will stay active for one hour. After an hour, users will need to re-provision resources."
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Button color="primary" onClick={() => {this.handleTerminate()}}>Shut down AWS resources</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <ModelConfig onSubmit={(values) => {this.handleSubmit(values)}} />
                        </Col>
                        <Col md={6}>
                            <ModelRunning />
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.props.modalOpen}>
                    <ModalHeader>Provision Model Resources</ModalHeader>
                    <ModalBody>
                        <p>
                            {(this.props.noResources) ? noResourceText : resourceText}
                            
                        </p>
                        <p>{this.props.resourceStatus}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.handleProvision()}}>{this.props.noResources ? "Get Resources" : "Continue"}</Button>
                        <Button color="danger" onClick={() => {this.handleCancel()}}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    
};


const mapStateToProps = (state) => {
    return {
        modalOpen: state.model_config.modalOpen,
        resourceStatus: state.model_config.resourceStatus,
        noResources: state.model_config.noResources
    };
};


export default connect(mapStateToProps, model_config)(ModelConfigPage);