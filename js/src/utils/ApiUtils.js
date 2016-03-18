import {receiveUsers} from '../actions/UsersActions';

module.exports = {
	getUsers: (dispatch, firstName, lastName) => {
		// webservice
		dispatch(receiveUsers([firstName, lastName]));
	}
}