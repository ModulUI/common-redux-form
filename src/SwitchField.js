import React from 'react'
import {Field} from 'redux-form'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export class SwitchField extends React.Component {

	static propTypes = {
		switchItems: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string,
				PropTypes.number]).isRequired
		})).isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		disabled: PropTypes.bool,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {name, switchItems, onChange, disabled, className} = this.props;

		return (<div className={classNames('switch_group', className)}>
			{switchItems.map(item => (
				<div className={classNames('switch_item', { 'disable_block': item.disabled || disabled })} key={item.id}>
					<Field name={name} id={item.id} component="input" type="radio" value={item.value} onChange={onChange} />
					<label htmlFor={item.id}>{item.label}</label>
				</div>)
			)}
		</div>)
	}
}
