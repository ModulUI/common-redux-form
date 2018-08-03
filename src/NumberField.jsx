import React from 'react';
import {Field} from 'redux-form/immutable';
import NumberRender from './renderControl/NumberRender';
import {numberHelper} from 'modul-helpers';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers';
import { validator, isValidNumber } from './validationHelpers/utils';
import PropTypes from 'prop-types';


class NumberField extends React.Component {
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

	render() {
		const {
			required,
			requiredDisable,
			validate = [],
			component = NumberRender,
			regExpValid = isValidNumber,
			invalidNumberError,
			...props
		} = this.props;

		const validNumber = validator(invalidNumberError, regExpValid);
		const validators = [
			...getRequiredValidator({required, requiredDisable}),
			validNumber,
			...validate
		];

		return (
			<Field
				type="tel"
				validate={validators}
				component={component}
				normalize={numberHelper.parseNumber}
				{...props}
			/>
		);
	}


}

export default NumberField;