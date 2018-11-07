import React from 'react';
import {Field} from 'redux-form';
import NumberRender from './renderControl/NumberRender';
import {numberHelper} from 'modul-helpers';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers';
import {validator, isValidNumber} from './validationHelpers/utils';
import PropTypes from 'prop-types';


export class NumberField extends React.Component {
	static defaultProps = {
		validate: [],
		component: NumberRender,
		invalidNumberError: 'Введите корректное значение'
	};

	static propTypes = {
		name: PropTypes.string.isRequired,
		component: PropTypes.any,
		regExpValid: PropTypes.any,
		invalidNumberError: PropTypes.string,
		format: PropTypes.func,
		normalize: PropTypes.func,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onDragStart: PropTypes.func,
		onDrop: PropTypes.func,
		parse: PropTypes.func,
		required: PropTypes.string, //текст ошибки при отсутствии значения
		requiredDisable: PropTypes.bool, //выключении валидации на обязательность значения
		validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
		wrapperClassName: PropTypes.string, //стили для дива в который будет завернуть компонент при натягивании валидации
		float: PropTypes.bool //для значений с запятой
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
		const {required, requiredDisable, validate, invalidNumberError} = props;
		this.validators.length = 0;
		const requiredFieldValidator = getRequiredValidator({
			required: required,
			requiredDisable: requiredDisable
		});

		const validNumber = validator(invalidNumberError, isValidNumber);

		this.validators.push(...requiredFieldValidator, validNumber);

		if (validate) {
			if (Array.isArray(validate))
				this.validators.push(...validate);
			else
				this.validators.push(validate);
		}
	}

	render() {
		const {
			component = NumberRender,
			...props
		} = this.props;

		return (
			<Field
                {...props}
				type="tel"
				validate={this.validators}
				component={component}
				normalize={numberHelper.parseNumber}
			/>
		);
	}


}
