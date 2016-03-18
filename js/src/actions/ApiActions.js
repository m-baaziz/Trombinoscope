import {getUsers} from '../utils/ApiUtils';

module.exports = {
	requestUsers: (firstName, lastName) => {
		return (dispatch) => {
			getUsers(dispatch, firstName, lastName);
		}
	}
}