import React from 'react';
import {validation, InputFocusable} from '../validationHelpers';
import MaskedInput from 'react-text-mask';


@validation({tips: true})
class InputRender extends React.Component {

    constructor(props) {
        super(props);
        this.focusator = new InputFocusable();
    }

    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        addClassName: '',
        maxLength: 255,
    };

    render() {
        const {input, label, className, type, validator, disabled, readOnly, maxLength, autoComplete, mask, onKeyDown} = this.props;
        const {tooltip, addClassName} = validator;
		const classNames = [className, addClassName].join(' ');
		if (mask) {
			return (
				<MaskedInput {...input}
						ref={input => this.focusator.init(input)}
						autoComplete={autoComplete}
						className={classNames}
						placeholder={label}
						type={type}
						disabled={disabled}
						readOnly={readOnly}
						maxLength={maxLength === 0 ? 100000 : maxLength}
						mask={mask}
						guide={false}
						{...maskProps}
						{...tooltip} />
			);
		}

		return (
			<input {...input}
					ref={input => this.focusator.init(input)}
					autoComplete={autoComplete}
					className={classNames}
					placeholder={label}
					type={type}
					disabled={disabled}
					readOnly={readOnly}
					maxLength={maxLength === 0 ? 100000 : maxLength}
				    onKeyDown={onKeyDown}
					{...tooltip} />
		);
    }
}

export default InputRender;