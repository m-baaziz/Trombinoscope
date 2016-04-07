import _ from 'lodash';

import {ActionTypes} from '../constants/Constants';

function options(state = ["photo", "nom"], action) {
	if (action.type == ActionTypes.SWAP_OPTION) {
		let newState = state.slice();
		_.includes(newState, action.option) ? _.pull(newState, action.option) : newState.push(action.option);
		return newState;
	}
	return state;
}

export default options;