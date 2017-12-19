/**
 * Created by jmartinez on 12/18/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {Form, FormGroup, Button, Label, FormFeedback, FormText} from 'reactstrap'
import SelectComponent from '../components/Forms/SelectComponent';
import {connect} from 'react-redux'

const UpdateUserRole = (props) => {
    const {handleSubmit} = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="user-select">Users, Old Role</Label>
                <Field name="user-select"
                       component={SelectComponent}
                       type="select"
                       selectOptions={props.currentUsers.map((user) => {return {value: user.email, name: `${user.email}, ${user.role}`}})}
                       valid={props.isValid}
                
                />
            </FormGroup>
            <FormGroup>
                <Label for="role-select">New Role</Label>
                <Field name="role-select" 
                       component={SelectComponent} 
                       type="select" 
                       selectOptions={props.roleOptions}
                       valid={props.isValid}
                />
            </FormGroup>
            <FormText>{props.statusText}</FormText>
            <Button color="primary" type="submit">Update</Button>
        </Form>
    )
};


const UpdateUserRoleForm = reduxForm({
    form: "UpdateUserRoleForm"
})(UpdateUserRole);

const selector = formValueSelector('UpdateUserRoleForm');

const mapStateToProps = (state) => {
    return {
        initialValues: {"role-select": "Admin"},
        roleOptions: state.users.roleOptions,
        currentUsers: state.users.currentUsers,
        userRole: selector(state, 'user-select'),
        isValid: state.users.isValid,
        statusText: state.users.statusText
    }

};



export default connect(mapStateToProps)(UpdateUserRoleForm);