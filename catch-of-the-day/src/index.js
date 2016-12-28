import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

const Root = () => {
	return(
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={StorePicker} />
				<Match pattern="/store/:storeId" component={App} />
				<Miss component={NotFound}/>
			</div>
		</BrowserRouter>
	)
}

// find the main id and render into it in the DOM
render(<Root />, document.querySelector('#main'));
