import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import SnilsRender from './renderControl/SnilsRender';
import { validator, isEmpty } from './validationHelpers/utils';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers';

const isValidSnils = snils => {
	if (isEmpty(snils)) {
		return true;
	}

	snils = snils.replace(/[^0-9]+/g, '').substring(0, 11);

	if (snils.length <= 11) {
		return /^[0-9]{11}$/.test(snils);
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
		invalidError: 'Укажите 11 цифр номера СНИСЛ',
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
		const { required, validate, requiredDisable, invalidError } = props;

		this.validators.length = 0;

		const requiredFieldValidator = getRequiredValidator({ required, requiredDisable });

		const validSnils = validator(invalidError, isValidSnils);

		this.validators.push(...requiredFieldValidator, validSnils);

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
