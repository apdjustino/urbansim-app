/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, Input, FormText, FormFeedback, } from 'reactstrap'
import renderInput from '../components/Forms/FormComponents';





const LogIn = (props) => {
    const {handleSubmit} = props;
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Field name="email" component={renderInput} type="email" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Field name="password" component={renderInput} type="password" />
                </FormGroup>
                <Button color="primary" type="submit">Log In</Button>
            </Form>
        </div>

    )
};

const LoginForm = reduxForm({
    form: 'login'
})(LogIn);

export default LoginForm;

