import {ActionTypes} from '../constants/Constants'

module.exports = {
	 receiveUsers: (users) => {
	 	return {
	 		type: ActionTypes.RECEIVE_USERS,
	 		users
	 	}
	 },
	 selectUser: (user) => {
	 	return {
	 		type: ActionTypes.SELECT_USER,
	 		user
	 	}
	 },
	 swapOption: (option) => {
	 	return {
	 		type: ActionTypes.SWAP_OPTION,
	 		option
	 	}
	 }
}