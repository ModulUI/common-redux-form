import React from 'react';
import { validation, CustomFocusable } from './../validationHelpers';
import { SnilsInput } from 'modul-ui';
import PropTypes from 'prop-types';

@validation({ tips: true })
export default class SnilsRender extends React.Component {
	static propTypes = {
		input: PropTypes.object,
		label: PropTypes.string,
		className: PropTypes.string,
		type: PropTypes.string,
		validator: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
		disabled: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.focusator = new CustomFocusable();
	}

	render() {
		const { input, label, className, type, validator, disabled } = this.props;

		const { tooltip, addClassName } = validator;

		const classNames = [className || '', addClassName || ''].join(' ');

		return (
			<SnilsInput
				ref={e => this.focusator.init(e)}
				{...input}
				className={classNames}
				placeholder={label}
				type={type}
				disabled={disabled}
				{...tooltip}
			/>
		);
	}
}
