import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
	constructor() {
		super();
		// initial state
		this.state = {
			fishes: {},
			order: {},
		}
		this.addFish = this.addFish.bind(this);
	}

	addFish(fish) {
		console.log("adding a fish!");
		// update our state
		// Not: 
		// this.state.fishes.fish1 = fish;
		const fishes = {...this.state.fishes};
		// add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		// set state
		// this.setState({fishes: fishes});
		this.setState({fishes});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
				</div>
				<Order />
				<Inventory addFish={this.addFish}/>
			</div>
		)
	}
}

export default App;