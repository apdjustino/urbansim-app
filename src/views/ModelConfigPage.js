/**
 * Created by jmartinez on 1/11/18.
 */
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux'
import ModelConfig from '../components/ModelConfig';
import Denied from './Denied';


class ModelConfigPage extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    handleSubmit(values){
        console.log(values);
    }
    
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <ModelConfig onSubmit={(values) => {this.handleSubmit(values)}} />
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

export default connect(mapStateToProps)(ModelConfigPage);