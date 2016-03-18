import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users';

module.exports = combineReducers({
	users,
	routing: routerReducer
});