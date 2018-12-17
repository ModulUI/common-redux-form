import React from "react";
import {InputFocusable, validation} from "../validationHelpers";
import classnames from "classnames";

@validation({tips: true, hideOnClickOutside: false})
class CheckboxRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new InputFocusable();
	}

	static defaultProps = {
		disabled: false,
		readOnly: false,
		className: '',
		addClassName: '',
	};

	render() {
		const {input, label, validator, disabled, readOnly} = this.props;
		const {tooltip, addClassName} = validator;
		return (
			<React.Fragment>
				<input {...input}
					   ref={input => this.focusator.init(input)}
					   type="checkbox"
					   disabled={disabled}
					   readOnly={readOnly}
					   id={input.name}
				/>
				<label htmlFor={input.name} className={classnames('label_check', { '_error': addClassName })}>
					<i className="icon" {...tooltip} />
					<span>
						{this.props.children}
				</span>
				</label>
			</React.Fragment>
		);
	}
}

export default CheckboxRender;