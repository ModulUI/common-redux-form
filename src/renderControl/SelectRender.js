// import React from 'react'
import {Select} from 'modul-ui';

import {validation, CustomFocusable} from '../validationHelpers'

import React from 'react'

@validation({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {
    constructor(props) {
        super(props);
        this.focusator = new CustomFocusable();
    }

    componentDidMount() {
        // TODO: исправить, костыль
        this.focusator.init(this.refInput);
        //ReactDOM.findDOMNode(this.refInput).setAttribute('data-for', this.props.validator.tooltip['data-for']);
        //ReactDOM.findDOMNode(this.refInput).setAttribute('data-tip', "");
    }

    render() {
        const {
            input: fieldInput, className, validator: {tooltip, addClassName},
            onSelectChange,
            onSelectBlur,
            valueKey = 'value',
            required,
			wrapperClassName,
            ...selectOptions
        } = this.props;

        const {
            onChange: onInputChange,
            onBlur: onInputBlur,
            ...input
        } = fieldInput;

        if (input.value === "") { //хак, при пустой строке показывается будто выбран элемент
            input.value = undefined;
        }

        const classNames = [className || '', addClassName || ''].join(' ');
        return (
            <Select
                ref={s => this.refInput = s}
				wrapperClassName={wrapperClassName}
                className={classNames}
                {...input}
                {...selectOptions}
                tooltipProps={tooltip}
                onFocus={this.onFocus}
                valueKey={valueKey}
                onChange={this.onChangeSelect}
                onBlur={this.onBlurSelect}
            />
        );
    }

    // отменяем всплытие события и вручную вызываем показ tooltip, иначе теряется currentTarget при перерендере
    onFocus = (e) => {
        const {input: fieldInput} = this.props;
        // if (this.props.searchable)
        // 	ReactTooltip.show(e.target.parentNode.parentNode.parentNode.parentNode);
        // else
        // 	ReactTooltip.show(e.target.parentNode.parentNode.parentNode);
        fieldInput.onFocus();
        e.stopPropagation();
    };

    onBlurSelect = event => {
        const {input: fieldInput, onSelectBlur} = this.props;
        const {onBlur: onInputBlur, ...input} = fieldInput;

        //ReactTooltip.hide(event.target);
        onInputBlur(input.value);
        if (onSelectBlur)
            onSelectBlur(event);
    };

    onChangeSelect = (obj) => {
        const { input: fieldInput, onSelectChange, noChange, valueKey = 'value', multi } = this.props;

        let {onChange: onInputChange} = fieldInput;
		if (onSelectChange) {
			onSelectChange(obj);
		}

		// noChange - не вызывать onChange redux-form, полностью переопределяем с помощью onSelectChange
		if (!noChange) {
			if (multi) {
				onInputChange(obj);
			} else {
				onInputChange(obj ? obj[valueKey] : null);
			}
		}
    }
}

SelectRender.propTypes = Select.propTypes;

export default SelectRender;




