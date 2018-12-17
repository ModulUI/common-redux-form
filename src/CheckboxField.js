import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import CheckboxRender from './renderControl/CheckboxRender';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers'


const normalizeCheckbox = valueString => valueString || '';



class CheckboxField extends React.Component {
	static defaultProps = {
		validate: [],
	};

	static propTypes = {
		name: PropTypes.string.isRequired,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onDragStart: PropTypes.func,
		onDrop: PropTypes.func,
		required: PropTypes.string, //текст ошибки при отсутствии значения
		requiredDisable: PropTypes.bool, //выключении валидации на обязательность значения
		validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
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
		const {type = 'text', required, requiredDisable, warn = [], ...props} = this.props;
		return (<Field {...props}
					   type="checkbox"
					   normalize={normalizeCheckbox}
					   validate={this.validators}
					   warn={warn}
					   component={CheckboxRender}
		>
			{this.props.children}
		</Field>);
	}
}

export {CheckboxField};