import {ActionTypes} from '../constants/Constants'

module.exports = {
	 receiveUsers: (users) => {
	 	return {
	 		type: ActionTypes.RECEIVE_USERS,
	 		users
	 	}
	 },
	 swapOption: (option) => {
	 	return {
	 		type: ActionTypes.SWAP_OPTION,
	 		option
	 	}
	 }
}