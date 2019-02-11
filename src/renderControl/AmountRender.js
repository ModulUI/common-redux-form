import React from 'react'
import { AmountInput } from 'modul-components';
import { validation, CustomFocusable } from '../validationHelpers'

@validation({tips: true})
class AmountRender extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled, maxLength} = this.props;
		const {tooltip, addClassName} = validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
      <AmountInput
        ref={(field) => {
          this.focusator.init(field)
        }}
				{...input}
        className={classNames}
        placeholder={label}
        maxLength={maxLength}
        type={type} disabled={disabled}
				{...tooltip}
      />
		);
	}
}

export default AmountRender;
