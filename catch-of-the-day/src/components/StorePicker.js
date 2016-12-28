import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// basic component
	// needs at least the render() method
	render() {
		return (
			// only one parent element in the render
			<form className="store-selector">
			{ /* comments inside JSX */ }
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name"
				defaultValue={getFunName()}/>
				<button type="submit">Visit Store -></button>
				
			</form>
		)
	}
}

export default StorePicker;