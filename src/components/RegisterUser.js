/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback, } from 'reactstrap'
import renderInput from '../components/Forms/FormComponents';
import SelectComponent from '../components/Forms/SelectComponent';
import {connect} from 'react-redux'

const RegisterUserComponent = (props) => {
    const {handleSubmit} = props;
    const options = [
        {value: "admin", name: "Admin"},
        {value: "user", name: "Modeler"}
    ];
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="register-email">Email</Label>
                <Field name="register-email" component={renderInput} type="email" />
            </FormGroup>
            <FormGroup>
                <Label for="register-password1">Password</Label>
                <Field name="register-password1" component={renderInput} type="password" />
            </FormGroup>
            <FormGroup>
                <Label for="register-password2">Confirm Password</Label>
                <Field name="register-password2" component={renderInput} type="password" />
            </FormGroup>
            <FormGroup>
                <Label for="role-select">Role</Label>
                <Field name="role-select" component={SelectComponent} type="select" selectOptions={options} />
            </FormGroup>
            <Button color="primary" type="submit">Register</Button>
        </Form>
    )
};

const mapStateToProps = (state) => {
    return {
        initialValues: {"role-select": "Admin"}
    }
};


const RegisterUserForm = reduxForm({
    form: "RegisterUserForm"
})(RegisterUserComponent);

export default connect(mapStateToProps)(RegisterUserForm);