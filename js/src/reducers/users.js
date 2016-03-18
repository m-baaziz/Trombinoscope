import {ActionTypes} from '../constants/Constants';

function users(state = [], action) {
	if (action.type == ActionTypes.RECEIVE_USERS) {
		return action.users;
	}
	return state;
}

export default users;