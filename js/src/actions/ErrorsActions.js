import {ActionTypes} from '../constants/Constants'

module.exports = {
	addError: (error) => {
		return {
			type: ActionTypes.ADD_ERROR,
			error
		}
	},
	clearErrors: () => {
		return {
			type: ActionTypes.CLEAR_ERRORS
		}
	}
}