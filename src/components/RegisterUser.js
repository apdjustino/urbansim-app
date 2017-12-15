/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback, FormText} from 'reactstrap'
import Loading from './Loading';
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
                <Field name="register-email" component={renderInput} type="email" valid={props.isValid}/>
                <FormFeedback>{props.statusText}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="role-select">Role</Label>
                <Field name="role-select" component={SelectComponent} type="select" selectOptions={options} />
                {
                    (props.isLoading ? <Loading /> : <FormText>{props.statusText}</FormText> ) 
                }
            </FormGroup>
            <Button color="primary" type="submit">Register</Button>
        </Form>
    )
};

const mapStateToProps = (state) => {
    return {
        initialValues: {"role-select": "Admin"},
        isValid: state.users.isValid,
        isLoading: state.users.isLoading,
        statusText: state.users.statusText
    }
};


const RegisterUserForm = reduxForm({
    form: "RegisterUserForm"
})(RegisterUserComponent);

export default connect(mapStateToProps)(RegisterUserForm);