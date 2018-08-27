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

const DatePickerRangeField = ({required, requiredDisable, validate = [], periods = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return (
		<Field
			type="text"
			validate={validators}
			component={DatePickerRangeRender}
			parse={parseDate}
			periods={periods}
			{...props}
		/>
	);
};

DatePickerRangeField.propTypes = {
	required: PropTypes.string,
	validate: PropTypes.array,
	requiredDisable: PropTypes.bool,
	wrapperClassName: PropTypes.string,
	tipPlace: PropTypes.string,
	validators: PropTypes.array,
	periods: PropTypes.array,
};

DatePickerRangeField.defaultProps = {
	periods: [],
};


export { DatePickerRangeField };
