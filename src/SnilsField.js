import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SnilsRender from './renderControl/SnilsRender';
import { validator, isEmpty } from './validationHelpers/utils';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers';

const isValidLength = snils => {
	if (isEmpty(snils)) {
		return true;
	}

	snils = snils.replace(/[^0-9]+/g, '').substring(0, 11);

	if (snils.length <= 11) {
		return /^[0-9]{11}$/.test(snils);
	}

	return false;
};

const isCorrectSum = snils => {
	if (snils.length != 11 && !/^\d*$/.test(snils)) return false;

	if (snils < 1001998) return false;

	var part = snils.slice(0, 9),
		sum = 0;
	for (var i = 0; i < part.length; i++) {
		sum = sum + part[i] * (part.length - i);
	}
	if (sum < 100 && sum == snils.slice(-2)) {
		return true;
	}
	if (sum == 100 || sum == 101) {
		return '00' == snils.slice(-2);
	}
	if (sum > 101) {
		sum = sum % 101;
		if (sum < 100 && sum == snils.slice(-2)) {
			return true;
		}
		if (sum == 100 || sum == 101) {
			return '00' == snils.slice(-2);
		}
	}
	return false;
};

const intParser = snils => snils.replace(/[^\d]/g, '');

export class SnilsField extends React.Component {
	static propTypes = {
		required: PropTypes.string,
		validate: PropTypes.array,
		requiredDisable: PropTypes.bool,
		invalidError: PropTypes.string,
	};

	static defaultProps = {
		validate: [],
		invalidLength: 'Снилс должен содержать 11 цифр',
		notCorrectSum: 'Не совпадает контрольная сумма',
	};

	constructor(props) {
		super(props);

		this.validators = [];
		this._createValidators(props);
	}

	componentWillReceiveProps(nextProps) {
		this._createValidators(nextProps);
	}

	_createValidators(props) {
		const { required, validate, requiredDisable, invalidLength, notCorrectSum } = props;

		this.validators.length = 0;

		const requiredFieldValidator = getRequiredValidator({ required, requiredDisable });

		const validLength = validator(invalidLength, isValidLength);
		const correctSum = validator(notCorrectSum, isCorrectSum);

		this.validators.push(...requiredFieldValidator, validLength, correctSum);

		if (validate) {
			if (Array.isArray(validate)) {
				this.validators.push(...validate);
			} else {
				this.validators.push(validate);
			}
		}
	}

	render() {
		const { ...props } = this.props;

		return <Field {...props} type="tel" component={SnilsRender} validate={this.validators} parse={intParser} />;
	}
}
