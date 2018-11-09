import React from 'react';
import {Field} from 'redux-form';
import TextAreaRender from './renderControl/TextAreaRender';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from './validationHelpers/formFieldHelpers'

class TextAreaField extends React.Component {

	static defaultProps = {
		validate: [],
	};

	static propTypes = inputFieldShape;

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

	render(){
		const {type = 'text', component = TextAreaRender, ...props} = this.props;

		return (<Field {...props}
					   type={type}
					   validate={this.validators}
					   component={component}
			/>);
	}
}

export default TextAreaField;