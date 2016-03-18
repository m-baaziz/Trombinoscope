import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/index';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				This is the react part !!
				<br />
				TEST TEST
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
    <App />
  </Provider>,
	document.getElementById('react')
);