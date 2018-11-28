import React from 'react'
import {validation, InputFocusable} from './../validationHelpers'


@validation({tips: true})
class TextAreaRender extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new InputFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled, rows, wrap, maxLength}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<textarea {...input}
					  ref={input => this.focusator.init(input)}
					  className={classNames}
					  placeholder={label}
					  type={type}
					  disabled={disabled}
					  {...tooltip}
					  rows={rows}
					  wrap={wrap}
					  maxLength={maxLength}
			/>
		);
	}
}

export default TextAreaRender;