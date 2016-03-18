import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './App.react';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
	      <Route path="show" component={App}/>
     	</Route>
    </Router>
  </Provider>,
	document.getElementById('react')
);