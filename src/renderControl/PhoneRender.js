import React from 'react'
// import {PhoneInput} from 'modul-ui'; // TODO нету
import PhoneInput from '../../../modul-ui/source/PhoneInput/PhoneInput.jsx'; // TODO
import {validation, CustomFocusable} from '../validationHelpers'
import classNames from "classnames";

@validation({tips: true})
class PhoneRender extends React.Component {
    constructor(props) {
        super(props);
        this.focusator = new CustomFocusable();
    }

    render() {
        const {input, label, className, type, validator, disabled} = this.props;
        const {tooltip, addClassName} = validator;
        const css = classNames(className, addClassName);
        return (
            <PhoneInput ref={field => this.focusator.init(field)}
                        {...input}
                        className={css}
                        placeholder={label}
                        type={type}
                        disabled={disabled}
                        {...tooltip} />
        );
    }
}

export default PhoneRender;