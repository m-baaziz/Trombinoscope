import {receiveUsers} from '../actions/UsersActions';

module.exports = {
	getUsers: (dispatch, firstName, lastName) => {
		dispatch(receiveUsers([firstName, lastName]));
	}
}