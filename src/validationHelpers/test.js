import React from "react";

function radValidate({tips} = {tips: true}) {
    return (WrappedComponent) => {
        class radValidateTooltip extends React.Component {

            constructor(props, context) {
                super(props, context);
                this.validatorId = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
                this.tooltipId = `tooltip_${ this.validatorId }`;
            }

            getError() {
                return this.props.field.error;
            }

            showTooltipError() {
                const {field: {hasError, error, wasSubmit, blured, focused}} = this.props;
                return hasError && error && (wasSubmit || blured) && focused;
            }

            // TODO: showTooltipHint
            // showTooltipHint() {
            //   const {field: {hasError, error, touched, submitFailed, isPristine}} = this.props;
            //   return hasError && error && (submitFailed || touched);
            // }

            getTooltipProps(tipPlace) {
                const self = this;
                return {
                    placement: tipPlace || "top",
                    preventHideOnFocus: false,
                    getContent: ::self.getError,
                    className: "error",
                    trigger: 'manual',
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
                    trigger: 'manual',
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
                const {field, hideTips = false, wrapperClassName = ''} = this.props;
                const {tipPlace, ...wrappedProps} = this.props;
                const {isValid, hasError, focused, wasSubmit, hint, blured} = field;

                const tooltip = this.getTooltipConfig({id: this.tooltipId});

                const highlightError = (!isValid || hasError) && (wasSubmit || blured);
                const highlightSuccess = (isValid || !hasError) && blured;
                const addClassName = `${ highlightError && 'error' } ${ highlightSuccess && 'success' }`;

                const validator = {
                    error: hasError,
                    isError: highlightError,
                    isSuccess: highlightSuccess,
                    addClassName,
                    tooltip,
                };

                if (tips && !hideTips) {
                    const showErrorMessage = this.showTooltipError();
                    const showHintMsg = !showErrorMessage && focused && hint;
                    let tooltipProps = this.getTooltipProps(tipPlace);
                    if (showHintMsg){
                        tooltipProps = this.getHintTooltipProps(tipPlace)
                    }


                    return (
                        <div className={wrapperClassName}>
                            <WrappedComponent {...wrappedProps}
                                              validator={validator}/>
                            {showErrorMessage && <ModulTooltip
                                dataFor={this.tooltipId}
                                {...tooltipProps} />}
                        </div>
                    );
                }
                return (<WrappedComponent {...this.props}
                                          validator={validator}/>);
            }
        }

        return radValidateTooltip;
    };
}