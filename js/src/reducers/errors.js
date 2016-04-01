import {ActionTypes} from '../constants/Constants';

function errors(state = [], action) {
	switch (action.type) {
		case ActionTypes.ADD_ERROR :
			let newState = state.slice();
			newState.push(action.error);
			return newState;
		case ActionTypes.CLEAR_ERRORS :
			return [];
		default :
			return state;
	}
}

export default errors;