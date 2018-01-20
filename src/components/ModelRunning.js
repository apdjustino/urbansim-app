/**
 * Created by jmartinez on 1/18/18.
 */
import React from 'react';
import {Row, Col, Container, ListGroup, ListGroupItem} from 'reactstrap'
import {connect} from 'react-redux';
import Loading from '../components/Loading'

const ModelRunning = (props) => {
    const yearListItem = props.yearsRunning.map((year) => {
        return (
            <ListGroupItem>
                <Row>
                    <Col md={10}>
                        {year}: {props[`model${year}`]}
                    </Col>
                    <Col md={2}><Loading /></Col>
                </Row>
            </ListGroupItem>
        )
    });
    return (
        <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <ListGroup>
                            {yearListItem}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        statusText: state.model_config.statusText,
        successText: state.model_config.successText,
        isRunning: state.model_config.modelIsRunning,
        yearsRunning: state.model_config.yearsRunning,
        model2015: state.model_config.model2015,
        model2016: state.model_config.model2016,
        model2017: state.model_config.model2017,
        model2018: state.model_config.model2018,
        model2019: state.model_config.model2019,
        model2020: state.model_config.model2020,
        model2021: state.model_config.model2021,
        model2022: state.model_config.model2022,
        model2023: state.model_config.model2023,
        model2024: state.model_config.model2024,
        model2025: state.model_config.model2025,
        model2026: state.model_config.model2026,
        model2027: state.model_config.model2027,
        model2028: state.model_config.model2028,
        model2029: state.model_config.model2029,
        model2030: state.model_config.model2030,
        model2031: state.model_config.model2031,
        model2032: state.model_config.model2032,
        model2033: state.model_config.model2033,
        model2034: state.model_config.model2034,
        model2035: state.model_config.model2035,
        model2036: state.model_config.model2036,
        model2037: state.model_config.model2037,
        model2038: state.model_config.model2038,
        model2039: state.model_config.model2039,
        model2040: state.model_config.model2040
    }
};

export default connect(mapStateToProps)(ModelRunning);
