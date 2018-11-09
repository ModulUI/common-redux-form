import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers';
import UploadRender from './renderControl/UploadRender';


class UploadField extends React.Component {
	static propTypes = {
		required: PropTypes.string,
		requiredDisable: PropTypes.bool,
		validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
	};
	static defaultProps = {
		validate: [],
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
			if (Array.isArray(validate)) {
				this.validators.push(...validate);
			}
            else {
				this.validators.push(validate);
			}
        }
	}

	render() {
		const { ...props } = this.props;

		return (
			<Field
				{...props}
				component={UploadRender}
				validate={this.validators}

			/>
		);
	}
}

export { UploadField };
