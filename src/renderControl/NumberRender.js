/* eslint-disable */
import React from 'react';
import {NumberInput} from 'modul-components';
import {validation, CustomFocusable} from './../validationHelpers';


@validation({tips: true})
class NumberRender extends React.Component {

	static defaultProps = {
		maxLength: 255
	};

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled, float, maxLength, precision, autoComplete, mask, placeholder} = this.props;
		const {tooltip, addClassName} = validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<NumberInput
				ref={field => this.focusator.init(field)}
				{...input}
				className={classNames}
				placeholder={label || placeholder}
				float={float}
				precision={precision}
				type={type} disabled={disabled}
				maxLength={maxLength == 0 ? 100000 : maxLength}
				mask={mask}
				autoComplete={autoComplete}
				{...tooltip}
			/>
		);
	}
}

export default NumberRender;