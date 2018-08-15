import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers'
import DatePickerRender from './renderControl/DatePickerRender';
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

const DatePickerField = ({required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return (
		<Field
			type="text"
			validate={validators}
			component={DatePickerRender}
			parse={parseDate}
			{...props}
		/>
	);
};

DatePickerField.propTypes = {
	required: PropTypes.string,
	validate: PropTypes.array,
	requiredDisable: PropTypes.bool,
	wrapperClassName: PropTypes.string,
	tipPlace: PropTypes.string,
	validators: PropTypes.array
};


export { DatePickerField };
