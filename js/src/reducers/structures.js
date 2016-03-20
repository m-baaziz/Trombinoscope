import {ActionTypes} from '../constants/Constants';

function structures(state = {primary: [], secondary: []}, action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_STRUCTURES :
			return Object.assign({}, state, {primary: action.structures});
		case ActionTypes.RECEIVE_SUB_STRUCTURES :
			return Object.assign({}, state, {secondary: action.subStructures});
		case ActionTypes.CLEAR_SUB_STRUCTURES :
			return Object.assign({}, state, {secondary: []}); 
		default :
			return state; 
	}
}

export default structures;