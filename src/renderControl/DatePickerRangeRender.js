import React from 'react';
import PropTypes from 'prop-types';
// import { DatePickerRange } from 'modul-ui'; // TODO нету
import DatePickerRange from '../../../modul-ui/source/DatePickerRange/DatePickerRange.jsx'; // TODO нету
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
		formatPicker: PropTypes.any,
		periods: PropTypes.array,
		dateFrom: PropTypes.object,
		dateTo: PropTypes.object,
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
			formatPicker,
			periods,
			dateFrom,
			dateTo,
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
				periods={periods}
				dateFrom={dateFrom}
				dateTo={dateTo}
			/>
		);
	}
}


export default DatePickerRangeRender;
