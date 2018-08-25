import React from 'react';
import PropTypes from 'prop-types';
import { DatePickerRange } from 'modul-components';
import { validation, CustomFocusable } from '../validationHelpers';


@validation({tips: true})
class DatePickerRangeRender extends React.Component {
	static propTypes = {
		input: PropTypes.object,
		label: PropTypes.string,
		className: PropTypes.string,
		validator: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.arrayOf(PropTypes.func)
		]),
		disabled: PropTypes.bool,
		timepicker: PropTypes.any,
		datepicker: PropTypes.any,
		formatPicker: PropTypes.any
	};

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {
			input,
			label,
			className,
			validator,
			disabled,
			timepicker,
			datepicker,
			formatPicker
		} = this.props;
		const {
			tooltip,
			addClassName
		} = validator;
		const classNames = [
			className || '',
			addClassName || ''
		].join(' ');

		return (
			<DatePickerRange
				ref={(field) => {
          this.focusator.init(field);
        }}
				autoComplete='off'
				{...input}
				className={classNames}
				placeholder={label}
				disabled={disabled}
				{...tooltip}
				timepicker={timepicker}
				datepicker={datepicker}
				format={formatPicker}
				yearStart={1900}
			/>
		);
	}
}


export default DatePickerRangeRender;
