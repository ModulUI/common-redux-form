import {reduxForm as _reduxForm, focus} from 'redux-form'
import React from 'react';

//import logger from 'common/helpers/logger';

export function searchFocusString(errors) {
    const firstField = Object.keys(errors)[0];
    if (!firstField)
        return null;

    if ((typeof errors[firstField] === 'string') || (typeof errors[firstField] === 'object' && 'key' in errors[firstField])) {
        return firstField;
    } else if (typeof errors[firstField] === 'object')
		if (Array.isArray(errors[firstField])) {
			return errors[firstField].filter(item => {
				if (item)
					return item;
			});
		} else {
			let obj = {...errors};
			let flag = true;
			let i = 0;
			let fieldString = '';
			let field = undefined;
			while (flag && i < 6) {
				field = Object.keys(obj)[0];
				fieldString += (fieldString ? '.' : '') + field;
				if (typeof obj[field] === 'string') {
					flag = false;
				} else {
					obj = obj[field];
				}
				i++;
			}
			return fieldString;
		}
}

const focusOnFailed = (errors, form, dispatch) => {
    if (errors) {
        const focusString = searchFocusString(errors);
        if (focusString)
            dispatch(focus(form, focusString));
    }
};

export const reduxForm = ({form, onSubmitFail: initialSubmitFailed, ...initialProps}) => (Component) => {
    const FormComponent = _reduxForm({form, ...initialProps})(Component);

    class ReduxForm extends React.Component {
        handleSubmitFailed(errors, dispatch, submitError, ...other) {
            const {onSubmitFail: propsSubmitFailed} = this.props;
            focusOnFailed(errors, form || this.props.form, dispatch);
            propsSubmitFailed && propsSubmitFailed(errors, dispatch, false);
            initialSubmitFailed && initialSubmitFailed(errors, dispatch, false);
            if (!propsSubmitFailed && !initialSubmitFailed)
                console.warn(submitError)
        }

        render() {
            const {onSubmitFail, ...otherProps} = this.props;
            return <FormComponent onSubmitFail={::this.handleSubmitFailed} {...otherProps}/>;
        }
    }

    return ReduxForm;
};