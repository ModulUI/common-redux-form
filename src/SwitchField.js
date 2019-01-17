import React from 'react'
import {Field} from 'redux-form'
import PropTypes from 'prop-types'

export class SwitchField extends React.Component {

	static propTypes = {
		switchItems: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string,
				PropTypes.number]).isRequired
		})).isRequired,
		name: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {name, switchItems} = this.props;

		return (<div className="switch_group">
			{switchItems.map(item => (
				<div className="switch_item" key={item.id}>
					<Field name={name} id={item.id} component="input" type="radio" value={item.value}/>
					<label htmlFor={item.id}>{item.label}</label>
				</div>)
			)}
		</div>)
	}
}
