import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import AmountRender from './renderControl/AmountRender';
import { numberHelper } from 'modul-helpers';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers'
import { validator, isValidNumber } from './validationHelpers/utils';

const {parseNumber} = numberHelper;
class AmountField extends React.Component {
	static defaultProps = {
		validate: [],
	};
	static propTypes = {
		name: PropTypes.string.isRequired,
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
		wrapperClassName: PropTypes.string //стили для дива в который будет завернуть компонент при натягивании валидации
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
		const {required, requiredDisable, validate} = props;
		this.validators.length = 0;
		const requiredFieldValidator = getRequiredValidator({required, requiredDisable});

		this.validators.push(...requiredFieldValidator);

		if (validate) {
			if (Array.isArray(validate))
				this.validators.push(...validate);
			else
				this.validators.push(validate);
		}
	}
	render() {
		const { required, requiredDisable, validate = [], invalidAmountError, ...props } = this.props;

		return (
			<Field
			  type="text"
			  parse={parseNumber}
			  component={AmountRender}
			  validate={this.validators}
			  {...props}
			/>
		)
	}
}

export { AmountField };
