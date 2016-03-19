import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users';
import options from './options';

module.exports = combineReducers({
	users,
	options,
	routing: routerReducer
});