import _ from 'lodash';

import {receiveUsers} from '../actions/UsersActions';

function recieveUsersFromWebService(data) {
	console.log(data);
}

module.exports = {
	getUsers: (dispatch, firstName, lastName) => {
		const url = `localhost/api?first_name=${_.toString(firstName)}&last_name=${_.toString(lastName)}`;
		$.get(url, (data) => {
			console.log(data);
		}, 'json');
	}
}