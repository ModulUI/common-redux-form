import React from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'modul-components';
import {validation, CustomFocusable} from '../validationHelpers';


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
		readOnly: PropTypes.bool
	};
	static defaultProps = {
		insideParent: false,
		readOnly: false,
	};

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	handleBlur = event => {
		const {input: fieldInput, onBlurDate} = this.props;
		const {onBlur: onInputBlur} = fieldInput;

		onInputBlur(event);
		if (onBlurDate)
			onBlurDate(event);
	};

	handleChange = (obj) => {
		const {input: fieldInput, onChangeDate} = this.props;

		let {onChange: onInputChange} = fieldInput;
		if (onChangeDate) {
			onChangeDate(obj);
		}
		onInputChange(obj);
	};

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
			readOnly,
			onChangeDate,
			onBlurDate,

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
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				className={classNames}
				placeholder={label}
				disabled={disabled}
				{...tooltip}
				timepicker={timepicker}
				datepicker={datepicker}
				format={formatPicker}
				yearStart={1900}
				insideParent={insideParent}
				readOnly={readOnly}
				mask
			/>
		);
	}
}


export default DatePickerRender;
