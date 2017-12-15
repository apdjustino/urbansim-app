/**
 * Created by jmartinez on 12/12/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback, FormText} from 'reactstrap';
import Loading from '../components/Loading';
import renderInput from '../components/Forms/FormComponents';
import {connect} from 'react-redux';


const RequestNewPassword = (props) => {
    const {handleSubmit} = props;
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email-reset">Email:</Label>
                    <Field name="email-reset" component={renderInput} type="email" valid={props.isValid}/>
                    {
                        (props.isLoading ? <Loading /> : 
                            (props.isValid ? <FormText>{props.statusText}</FormText> : 
                                <FormFeedback>{props.statusText}</FormFeedback>))
                        
                    }
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>{' '}
                <Button color="danger" onClick={props.togglePwdReset}>Back</Button>
            </Form>
        </div>
        )
};

const PasswordResetForm = reduxForm({
    form: 'password-reset'
})(RequestNewPassword);

const mapStateToProps = (state) => {
    return {
        isValid: state.users.pwdResetEmailIsValid,
        isLoading: state.users.isLoading,
        statusText: state.users.statusText
    }
};

export default connect(mapStateToProps)(PasswordResetForm);