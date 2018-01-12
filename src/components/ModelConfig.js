/**
 * Created by jmartinez on 1/11/18.
 */
import React from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {Row, Col, Form, FormGroup, Button, Label, FormFeedback, FormText} from 'reactstrap'
import Loading from './Loading';
import renderInput from '../components/Forms/FormComponents';
import SelectComponent from '../components/Forms/SelectComponent';
import {connect} from 'react-redux'


const ModelConfigComponent = (props) => {
    const {handleSubmit} = props;
    console.log(props.selectedModel);
    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Row>
                    <Col md={6}>
                        <h2>Model and Simulation Year</h2>
                        <FormGroup>
                            <Label for="model-select">Choose models to run:</Label>
                            <Field name="model-select" component={SelectComponent} type="select" selectOptions={props.modelOptions} multiple/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <h2>Information</h2>
                        <p>{(props.selectedModel ? props.selectedModel.toString() : "")}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="year-select">Choose Simulation Years: </Label>
                            <Field name="year-select" component={SelectComponent} type="select" selectOptions={props.years} multiple />
                        </FormGroup>
                    </Col>

                </Row>
                <h2>Forecast and Population</h2>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="forecast-select">Choose Macro-economic Forecast: </Label>
                            <Field name="forecast-select" component={SelectComponent} type="select" selectOptions={props.forecasts} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <p>{props.selectedForecast}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="population-select">Choose Synthesized Population: </Label>
                            <Field name="population-select" component={SelectComponent} type="select" selectOptions={props.population} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <p>{props.selectedPopulation}</p>
                    </Col>
                </Row>
                <h2>Zoning and Prices</h2>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="zoning-select">Choose Zoning Assumptions</Label>
                            <Field name="zoning-select" component={SelectComponent} type="select" selectOptions={props.zoning} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <p>{props.selectedZoning}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="pricing-select">Choose Pricing Assumptions</Label>
                            <Field name="pricing-select" component={SelectComponent} type="select" selectOptions={props.pricing} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <p>{props.selectedPricing}</p>
                    </Col>
                </Row>
                <Button color="primary" type="submit">Submit</Button>
            </Form>    
        </div>
        
    )

};


const ModelConfigForm = reduxForm({
    form: "ModelConfigForm",
    enableReinitialize: true,
})(ModelConfigComponent);

const selector = formValueSelector('ModelConfigForm');


const mapStateToProps = (state) => {
    return {
        modelOptions: [
            {value: "model1", name: "Model 1"},
            {value: "model2", name: "Model 2"},
            {value: "model3", name: "Model 3"},
        ],
        selectedModel: selector(state, 'model-select'),
        years: [...Array(2041).keys()].slice(2010).map((year) => ({name: year, value: year})),
        selectedYears: selector(state, 'year-select'),
        forecasts: [{value: "forecast1", name: "forecast 1"}, {value: "forecast2", name: "forecast 2"}],
        selectedForecast: selector(state, 'forecast-select'),
        population: [{value: "population1", name: "population 1"}, {value: "population2", name: "population 2"}],
        selectedPopulation: selector(state, 'population-select'),
        zoning: [{value: "zoning1", name: "zoning 1"}, {value: "zoning", name: "zoning 2"}],
        selectedZoning: selector(state, 'zoning-select'),
        pricing: [{value: "pricing1", name: "pricing 1"}, {value: "pricing", name: "pricing 2"}],
        selectedPricing: selector(state, 'pricing-select'),
        
    };
};


export default connect(mapStateToProps)(ModelConfigForm);

