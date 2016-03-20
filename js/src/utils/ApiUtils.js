import _ from 'lodash';

import {receiveUsers} from '../actions/UsersActions';
import {receiveStructures, receiveSubStructures} from '../actions/StructuresActions';

module.exports = {
	getUsersByIdentity: (dispatch, firstName, lastName) => {
		const url = `localhost/api/users?first_name=${_.toString(firstName)}&last_name=${_.toString(lastName)}`;
		$.get(url, (data) => {
			dispatch(receiveUsers(data));
		}, 'json');
	},

	getUsersByStructures: (dispatch, primary, secondary) => {
		const url = `localhost/api/users?primary_struct=${_.toString(primary)}&secondary_struct=${!_.isEmpty(_.toString(secondary)) ? secondary : 0}`;
		$.get(url, (data) => {
			dispatch(receiveUsers(data));
		}, 'json');
	},

	getStructures: (dispatch) => {
		const url = 'localhost/api/structures';
		$.get(url, (data) => {
			dispatch(receiveStructures(data));
		}, 'json');
	},

	getSubStructures: (dispatch, structId) => {
		const url = `localhost/api/structures?struct_id=${structId}`;
		$.get(url, (data) => {
			dispatch(receiveSubStructures(data));
		}, 'json');
	}
}