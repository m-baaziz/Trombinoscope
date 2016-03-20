import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users';
import options from './options';
import structures from './structures';

module.exports = combineReducers({
	users,
	options,
	structures,
	routing: routerReducer
});