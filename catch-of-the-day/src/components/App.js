import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();
		// initial state
		this.state = {
			fishes: {},
			order: {},
		}
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
	}

	componentWillMount() {
		this.ref = base.syncState(
			`${this.props.params.storeId}/fishes`,
			{
				context: this,
				state: 'fishes'
			}
		)

		// check if there is an order in local storage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if (localStorageRef) {
			// update our App's order in state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(
			`order-${this.props.params.storeId}`, 
			JSON.stringify(nextState.order),
			)
	}


	componentWillUnmount() {
		base.removeBinding(this.ref);
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

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({fishes});
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	loadSamples() {
		this.setState({fishes: sampleFishes});
	}
	
	addToOrder(key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		if (order[key] > 1) {
			order[key] = order[key] - 1;
		} else {
			delete order[key];
		}
		this.setState({order});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
					{
						Object.keys(this.state.fishes)
						.map(key => 
							<Fish 
								key={key} 
								index={key} 
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						)
					}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
					// When/why is this needed?
					// params={this.props.params}
				/>
				<Inventory 
					addFish={this.addFish}
					loadSamples={this.loadSamples}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
				/>
			</div>
		)
	}
}

export default App;