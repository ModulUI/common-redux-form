import React from 'react'
import {Field} from 'redux-form'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export class SwitchField extends React.Component {

	static propTypes = {
		switchItems: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			isChecked: PropTypes.bool,
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string,
				PropTypes.number]).isRequired
		})).isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		disabled: PropTypes.bool,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {name, switchItems, onChange, disabled} = this.props;

		return (<div className="switch_group">
			{switchItems.map(item => (
				<div className={classNames('switch_item', { 'disable_block': item.disabled || disabled })} key={item.id}>
					<Field name={name} id={item.id} component="input" type="radio" value={item.value} onChange={onChange} checked={item.isChecked} />
					<label htmlFor={item.id}>{item.label}</label>
				</div>)
			)}
		</div>)
	}
}
