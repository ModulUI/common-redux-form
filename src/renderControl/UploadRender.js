import React from 'react';
import { DropZone } from 'modul-components';
import { validation, InputFocusable } from '../validationHelpers';


@validation({tips: true})
class UploadRender extends React.Component {
	constructor(props) {
        super(props);
        this.focusator = new InputFocusable();
    }
	render() {
		const { input, meta, validator, disabled, children, onDropFile, ...props } = this.props;
		const { tooltip, addClassName } = validator;

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
				className={addClassName}
				{...props}
				{...tooltip}
			>{children}</DropZone>
		);
	}
}

export default UploadRender;
