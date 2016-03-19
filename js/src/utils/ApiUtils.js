import _ from 'lodash';

import {receiveUsers} from '../actions/UsersActions';

module.exports = {
	getUsers: (dispatch, firstName, lastName) => {
		const url = `localhost/api?first_name=${_.toString(firstName)}&last_name=${_.toString(lastName)}`;
		$.get(url, (data) => {
			dispatch(receiveUsers(data));
		}, 'json');
	}
}