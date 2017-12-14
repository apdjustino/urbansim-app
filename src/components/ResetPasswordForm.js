/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback, } from 'reactstrap'
import renderInput from '../components/Forms/FormComponents';
import {connect} from 'react-redux'

const ResetPasswordComponent = (props) => {
    const {handleSubmit} = props;
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="reset-password1">New Password</Label>
                    <Field name="reset-password1" component={renderInput} type="password" valid={props.isValid}/>
                    <FormFeedback>{props.statusText}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="reset-password2">Confirm New Password</Label>
                    <Field name="reset-password2" component={renderInput} type="password" valid={props.isValid}/>
                    <FormFeedback>{props.statusText}</FormFeedback>
                </FormGroup>
                <Button color="primary" type="submit">Reset Password</Button>
            </Form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isValid: state.users.isValid,
        statusText: state.users.statusText
    }
};

const ResetPasswordForm = reduxForm({
    form: 'reset-pwd-form'
})(ResetPasswordComponent);

export default connect(mapStateToProps)(ResetPasswordForm);