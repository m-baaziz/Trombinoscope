import {ActionTypes} from '../constants/Constants'

module.exports = {
	receiveStructures: (structures) => {
		return {
			type: ActionTypes.RECEIVE_STRUCTURES,
			structures
		}
	},
	receiveSubStructures: (subStructures) => {
		return {
			type: ActionTypes.RECEIVE_SUB_STRUCTURES,
			subStructures
		}
	},
	clearSubStructures: () => {
		return  {
			type: ActionTypes.CLEAR_SUB_STRUCTURES
		}
	}
}