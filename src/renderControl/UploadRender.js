import React from 'react';
import { DropZone } from 'modul-ui';
import { validation, InputFocusable } from '../validationHelpers';


@validation({tips: true})
class UploadRender extends React.Component {
	constructor(props) {
        super(props);
        this.focusator = new InputFocusable();
    }
	render() {
		const { input, meta, validator, disabled, children, onDropFile, className, ...props } = this.props;
		const { tooltip, addClassName } = validator;
		const classNames = [className || '', addClassName || ''].join(' ');

		return (
			<DropZone
				{...input}
				getRef={input => this.focusator.init(input)}
				disabled={disabled}
				onDrop={(files) => {
					input.onBlur(files);
					if (typeof onDropFile === 'function') {
						onDropFile(files);
					}
				}}
				className={classNames}
				{...props}
				{...tooltip}
			>{children}</DropZone>
		);
	}
}

export default UploadRender;
