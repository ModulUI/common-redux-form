import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition, getRandomKey} from './validationHelpers/formFieldHelpers'
import React from 'react'
import {ModulTooltip} from 'modul-components';
import classNames from "classnames";

/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 *
 * tips - включены ли подскажи тултипа
 * dataOnWrapper - данные для фокусировки и отображению тултипа внедряются в оборачивающий элемент
 */
export function validation({tips, dataOnWrapper} = {tips: true, dataOnWrapper: false}) {
    return (WrappedComponent) => {
        class radValidateTooltip extends React.Component {

            constructor(props, context) {
                super(props, context);
                this.validatorId = getRandomKey();
				this.tooltipId = `tooltip_${this.validatorId}`;
            }

            componentDidUpdate(prevProps) {
                const {meta: {submitFailed, active, error}} = this.props;
                const {meta: {active: wasActive}} = prevProps;

                if (submitFailed && error && !wasActive && active) {
                    setTimeout(() => {
                        if (this.wrappedEl) {
                            if (!this.wrappedEl.focusator)
                                throw 'Component does not contain @focusator:IFocusableElement';
                            this.wrappedEl.focusator.setFocus();
                        }
                    }, 0);
                }
            }


            inFocus() {
                const {meta: {active}} = this.props;
                return active
                    ||
                    (this.wrappedEl
                        && this.wrappedEl.inFocus
                        && this.wrappedEl.inFocus());
            }

            getError() {
                const {meta: {error}} = this.props;
                return error && (error.text || error);
            }

            showTooltipError() {
                const {meta: {active, touched, error, submitFailed}} = this.props;
                return error && ((submitFailed || touched) && active);
            }

            getTooltipProps(tipPlace) {
                const self = this;
                return {
                    placement: tipPlace || "top",
                    preventHideOnFocus: false,
                    getContent: ::self.getError,
                    className: "error",
                    trigger: "manual",
                    showInitial: true,
                    hideOnClickOutside: true,
                    html: true
                };
            }

            getHintTooltipProps(tipPlace) {
                const self = this;
                return {
                    placement: tipPlace || "top",
                    preventHideOnFocus: false,
                    getContent: ::self.getError,
                    className: "",
                    trigger: "manual",
                    showInitial: true,
                    hideOnClickOutside: true,
                    html: true
                };
            }

            getTooltipConfig({id}) {
                return {
                    'data-mtip': id,
                };
            }

            render() {
                const {
                    meta: {touched, error, warning, active, dirty, valid, visited, submitFailed},
                    hideTips,
                    wrapperClassName = ''
                } = this.props;

                const {tipPlace, ...wrappedProps} = this.props;

                const tooltip = this.getTooltipConfig({id: this.tooltipId});

                const isError = showErrorBorder({valid, error, touched, submitFailed});
                const isSuccess = showSuccessBorder({valid, visited, error, active});

				const additionalClassName = classNames({error: isError}, {success: isSuccess});


                const validator = {
                    error: error,
                    isError: isError,
                    isSuccess: isSuccess,
                    addClassName: additionalClassName,
                    tooltip: tooltip
                };

                if (tips && !hideTips) {
                    const showErrorMessage = this.showTooltipError();
                    let tooltipProps = this.getTooltipProps(tipPlace);

                    return (
                        <div className={wrapperClassName}>
                            <WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl}
                                              {...wrappedProps} validator={validator}/>

                            {showErrorMessage && <ModulTooltip dataFor={this.tooltipId}
                                                               {...tooltipProps} />}
                        </div>
                    )
                }

                return <WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl}
                                         {...wrappedProps} validator={validator}/>


            }
        }

        return radValidateTooltip;
    }
}