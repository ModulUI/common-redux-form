import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers'
import DatePickerRangeRender from './renderControl/DatePickerRangeRender';
import { dateHelper } from 'modul-helpers';


const parseDate = date => {
	if (!date) {
		return date;
  }
	if (date.replace) {
		return dateHelper.parseDate(date, 'd.m.Y');
  }
	return date;
};
class DatePickerRangeField extends React.Component {
	static propTypes = {
		required: PropTypes.string,
		validate: PropTypes.array,
		requiredDisable: PropTypes.bool,
		tipPlace: PropTypes.string,
		validators: PropTypes.array,
		periods: PropTypes.array,
		dateFrom: PropTypes.object,
		dateTo: PropTypes.object,
	};
	
	static defaultProps = {
		periods: [],
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
		const { periods = [], dateFrom, dateTo, ...props } = this.props;
		return (
			<Field
				{...props}
				type="text"
				validate={this.validators}
				component={DatePickerRangeRender}
				parse={parseDate}
				periods={periods}
				dateFrom={dateFrom}
				dateTo={dateTo}
			/>
		);
	}
}

export { DatePickerRangeField };
