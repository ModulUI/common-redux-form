import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import AmountRender from './renderControl/AmountRender';
import { numberHelper } from 'modul-helpers';
import { getRequiredValidator } from './validationHelpers/formFieldHelpers'
import { validator, isValidNumber } from './validationHelpers/utils';

const {parseNumber} = numberHelper;
const AmountField = ({ required, requiredDisable, validate = [], invalidAmountError, ...props }) => {
    const validNumber = validator(invalidAmountError || 'Введите корректное значение', isValidNumber);
    const validators = [...getRequiredValidator({required, requiredDisable}), validNumber, ...validate];
    return (
      <Field
        type="text"
        parse={parseNumber}
        component={AmountRender}
        validate={validators}
        {...props}
      />
    );
};

AmountField.propTypes = {
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

export { AmountField };
