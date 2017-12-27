/**
 * Created by jmartinez on 12/19/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {Form, FormGroup, Button, Label, FormText} from 'reactstrap'
import SelectComponent from '../components/Forms/SelectComponent';
import {connect} from 'react-redux'

const DeleteUser = (props) => {

    const {handleSubmit} = props;
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="delete-user">User Email</Label>
                <Field name="delete-user"
                       component={SelectComponent}
                       type="select"
                       selectOptions={props.currentUsers.map((user) => {return {value: user.email, name: user.email}})}
                       valid={props.isValid}
                />
                <FormText>{props.statusText}</FormText>
            </FormGroup>
            <Button color="danger" type="submit">Delete</Button>
        </Form>
    )

};

const DeleteUserForm = reduxForm({
    form: "DeleteUserForm",
    enableReinitialize: true
})(DeleteUser);

const selector = formValueSelector('DeleteUserForm');

const mapStateToProps = (state) => {
    const initUser = (state.users.currentUsers.length > 0 ? state.users.currentUsers[0].email : "");
    return {
        initialValues: {"delete-user": initUser},
        roleOptions: state.users.roleOptions,
        currentUsers: state.users.currentUsers,
        selectedUser: selector(state, "delete-user"),
        isValid: state.users.isValid,
        statusText: state.users.statusText,
        
        
    }
};

export default connect(mapStateToProps)(DeleteUserForm);