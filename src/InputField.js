import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';

import InputRender from './renderControl/InputRender';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers'

class InputField extends React.Component {
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
		wrapperClassName: PropTypes.string, //стили для дива в который будет завернуть компонент при натягивании валидации
		tipPlace: PropTypes.string, //где будет выводится тултип
		mask: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
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
		const {type = 'text', component = InputRender, warn = [], ...props} = this.props;

		return (<Field {...props}
					   type={type}
					   validate={this.validators}
					   warn={warn}
					   component={component}
					   />);
	}
}

export {InputField};