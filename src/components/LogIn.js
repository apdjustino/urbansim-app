/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, Input, FormText, FormFeedback, } from 'reactstrap'
import renderInput from '../components/Forms/FormComponents';
import {connect} from 'react-redux'


const LogIn = (props) => {
    const {handleSubmit} = props;
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Field name="email" component={renderInput} type="email" valid={props.isValid}/>
                    <FormFeedback>{props.statusText}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Field name="password" component={renderInput} type="password" valid={props.isValid} />
                    <FormFeedback>{props.statusText}</FormFeedback>
                </FormGroup>
                <Button color="primary" type="submit">Log In</Button> {' '}
                <Button color="info" onClick={props.togglePwdReset}>Reset Password</Button>
            </Form>

        </div>

    )
};

const LoginForm = reduxForm({
    form: 'login'
})(LogIn);

const mapStateToProps = (state) => {
    return {
        isValid: state.users.isValid,
        statusText: state.users.statusText
    }
};

export default connect(mapStateToProps)(LoginForm);

