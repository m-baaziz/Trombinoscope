import {ActionTypes} from '../constants/Constants';

function users(state = {all: [], selected: null}, action) {
	if (action.type == ActionTypes.RECEIVE_USERS) {
		return Object.assign({}, state, {all: action.users, selected: action.users[0]});
	}
	if (action.type == ActionTypes.SELECT_USER) {
		return Object.assign({}, state, {selected: action.user});	
	}
	return state;
}

export default users;