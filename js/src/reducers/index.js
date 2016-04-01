import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users';
import options from './options';
import structures from './structures';
import errors from './errors';

module.exports = combineReducers({
	users,
	options,
	structures,
	errors,
	routing: routerReducer
});