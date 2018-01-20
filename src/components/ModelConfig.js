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
    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Row>
                    <Col md={12}>
                        <h2>Model and Simulation Year</h2>
                        <FormGroup>
                            <Label for="model-select">Choose models to run:</Label>
                            <Field name="model-select" 
                                   component={SelectComponent} 
                                   type="select" 
                                   selectOptions={props.modelOptions} 
                                   multiple
                                   valid={props.isValid}
                            />
                            <FormFeedback>{props.formFeedBack}</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="year-select">Choose Simulation Years: </Label>
                            <Field name="year-select"
                                   component={SelectComponent}
                                   type="select" 
                                   selectOptions={props.years} 
                                   multiple
                                   valid={props.isValid}
                            />
                            <FormFeedback>{props.formFeedBack}</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
                <h2>Forecast and Population</h2>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="forecast-select">Choose Macro-economic Forecast: </Label>
                            <Field name="forecast-select" component={SelectComponent} type="select" selectOptions={props.forecasts} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="population-select">Choose Synthesized Population: </Label>
                            <Field name="population-select" component={SelectComponent} type="select" selectOptions={props.population} />
                        </FormGroup>
                    </Col>
                </Row>
                <h2>Zoning and Prices</h2>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="zoning-select">Choose Zoning Assumptions</Label>
                            <Field name="zoning-select" component={SelectComponent} type="select" selectOptions={props.zoning} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="pricing-select">Choose Pricing Assumptions</Label>
                            <Field name="pricing-select" component={SelectComponent} type="select" selectOptions={props.pricing} />
                        </FormGroup>
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
            {value: "price_growth", name: "Price Growth"},
            {value: "establishment_transition", name: "Establishment Transition"},
            {value: "household_transition", name: "Household Transition"},
            {value: "feasibility", name: "Parcel Feasibility"},
            {value: "non_res_developer", name: "Non-Residential Developer"},
            {value: "res_developer", name: "Residential Developer"},
            {value: "establishment_simulation", name: "Establishment Simulation"},
            {value: "household_simulation", name: "Household Simulation"}

        ],
        selectedModel: selector(state, 'model-select'),
        years: [...Array(2041).keys()].slice(2015).map((year) => ({name: year, value: year})),
        selectedYears: selector(state, 'year-select'),
        forecasts: [{value: "forecast1", name: "forecast 1"}],
        selectedForecast: selector(state, 'forecast-select'),
        population: [{value: "population1", name: "population 1"}],
        selectedPopulation: selector(state, 'population-select'),
        zoning: [{value: "zoning1", name: "zoning 1"}],
        selectedZoning: selector(state, 'zoning-select'),
        pricing: [{value: "pricing1", name: "pricing 1"}],
        selectedPricing: selector(state, 'pricing-select'),
        initialValues: {
            'forecast-select': 'forecast1',
            'population-select': 'population1',
            'zoning-select': 'zoning1',
            'pricing-select': 'pricing1',
        },
        isValid: state.model_config.isValid,
        formFeedBack: state.model_config.formFeedBack
        
    };
};


export default connect(mapStateToProps)(ModelConfigForm);

