import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				This is the react part !!
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));