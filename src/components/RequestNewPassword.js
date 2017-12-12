/**
 * Created by jmartinez on 12/12/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback} from 'reactstrap';
import renderInput from '../components/Forms/FormComponents';
import {connect} from 'react-redux';


const RequestNewPassword = (props) => (
    <div>
        <Form inline onSubmit={props.handleSubmit}>
            <FormGroup>
                <Label for="email-reset">Email:</Label>
                <Field name="email-reset" component={renderInput} type="email" valid={props.isValid}/>
                <FormFeedback>{props.statusText}</FormFeedback>
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>{' '}
            <Button color="danger" onClick={props.togglePwdReset}>Cancel</Button>
        </Form>
    </div>
);

const PasswordResetForm = reduxForm({
    form: 'password-reset'
})(RequestNewPassword);

const mapStateToProps = (state) => {
    return {
        isValid: state.users.pwdResetEmailIsValid,
        isReset: state.users.isReset
    }
};

export default connect(mapStateToProps)(PasswordResetForm);