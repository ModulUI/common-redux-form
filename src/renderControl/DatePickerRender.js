import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'modul-ui';
import { validation, CustomFocusable } from '../validationHelpers';


@validation({tips: true})
class DatePickerRender extends React.Component {
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
		insideParent: PropTypes.bool,
		minDate: PropTypes.string,
		onShow: PropTypes.func,
	};
	static defaultProps = {
		insideParent: false,
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
			insideParent,
			allowDates,
			minDate,
			onShow,
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
			<DatePicker
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
				insideParent={insideParent}
				allowDates={allowDates}
				minDate={minDate}
				onShow={onShow}
				mask
			/>
		);
	}
}


export default DatePickerRender;
