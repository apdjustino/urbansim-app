/**
 * Created by jmartinez on 12/14/17.
 */
import React, {Component} from 'react';
import { Input } from 'reactstrap';

const SelectComponent = ({
    children,
    type,
    size,
    bsSize,
    valid,
    tag,
    innerRef,
    plaintext,
    addon,
    className,
    cssModule,
    input,
    ...rest,
    selectOptions

}) => {
    const optionsArr = selectOptions.map((option) => {
        return (
            <option value={option.value}>{option.name}</option>
        )
    });
    return (
        <Input type={type}
               size={size}
               bssize={bsSize}
               valid={valid}
               tag={tag}
               innerref={innerRef}
               plaintext={plaintext}
               addon={addon}
               className={className}
               cssModule={cssModule}
            {...input}
            {...rest}
        >
            {optionsArr}
        </Input>
    )
};

export default SelectComponent;

