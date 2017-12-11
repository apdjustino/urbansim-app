/**
 * Created by jmartinez on 12/11/17.
 */
import React, {Component} from 'react';
import { Input } from 'reactstrap';

const renderInput = ({
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
    ...rest

}) => (
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
        />
);

export default renderInput;
