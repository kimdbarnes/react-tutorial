import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// basic component

	// need ctor to bind "this"
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }

	goToStore(event) {
		event.preventDefault();

		const storeId = this.storeInput.value;

		// first grab text from box
		console.log(storeId);

		// second transition from / to /store/:storeId
		this.context.router.transitionTo(`store/${storeId}`);
	}

	// needs at least the render() method
	render() {
		return (
			// only one parent element in the render
			<form className="store-selector" onSubmit={(e) => {this.goToStore(e)}}>
			{ /*  another way to make sure this is bound: */ }
			{ /* <form className="store-selector" onSubmit={this.goToStore.bind(this)}> */ }
			{ /* comments inside JSX */ }
				<h2>Please Enter A Store</h2>
				<input type="text" 
					required 
					placeholder="Store Name"
					defaultValue={getFunName()} 
					ref={(input) => { this.storeInput = input; } }
				/>
				<button type="submit">Visit Store -></button>
				
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;