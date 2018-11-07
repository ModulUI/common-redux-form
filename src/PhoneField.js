import React from 'react';
import {Field} from 'redux-form';
import PhoneRender from './renderControl/PhoneRender'
//import normalizePhone from './normalizePhone'
//import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers'
import {validator, isValidPhone, getPlainNumber} from './validationHelpers/utils'

const phoneParser = (value) => {
    return value.replace(/[^\d]/g, '');
};

export class PhoneField extends React.Component {
    static defaultProps = {
        validate: [],
        invalidPhoneError: 'Укажите 10 цифр номера мобильного телефона'
    };

    constructor(props) {
        super(props);
        this.phoneValidators = [];
        this._createValidators(props);
    }

    componentWillReceiveProps(nextProps) {
        this._createValidators(nextProps);
    }

    _createValidators(props) {
        const {required, requiredDisable, invalidPhoneError, validate} = props;
        this.phoneValidators.length = 0;
        const requiredFieldValidator = getRequiredValidator({
            required: required,
            requiredDisable: requiredDisable
        });

        const validPhoneValidator = validator(invalidPhoneError, isValidPhone);

        this.phoneValidators.push(...requiredFieldValidator, validPhoneValidator);

        if (validate) {
            if (Array.isArray(validate))
                this.phoneValidators.push(...validate);
            else
                this.phoneValidators.push(validate);
        }
    }

	render() {
		const {...props} = this.props;

		return (<Field
			{...props}
			type="tel" component={PhoneRender}
			validate={this.phoneValidators}
			parse={phoneParser}
		/>);
	}
}