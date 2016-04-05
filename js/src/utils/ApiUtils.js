import _ from 'lodash';

import {receiveUsers} from '../actions/UsersActions';
import {receiveStructures, receiveSubStructures} from '../actions/StructuresActions';
import {addError, clearErrors} from '../actions/ErrorsActions';

module.exports = {
	getUsersByIdentity: (dispatch, firstName, lastName) => {
		const req = $.get('users', {first_name: _.toString(firstName), last_name: _.toString(lastName)});
		req.done((data) => {
			dispatch(receiveUsers(data));
		});
		req.error((error) => {
			dispatch(addError(error.responseText));
		})
	},

	getUsersByStructures: (dispatch, primary, secondary) => {
		const req = $.get('users', {primary_struct: _.toString(primary), secondary_struct: !_.isEmpty(_.toString(secondary)) ? secondary : 0});
		req.done((data) => {
			dispatch(receiveUsers(data));
		});
		req.error((error) => {
			dispatch(addError(error.responseText));
		})
	},

	getStructures: (dispatch) => {
		const req = $.get('structures');
		req.done((data) => {
			dispatch(receiveStructures(data));
		});
	},

	getSubStructures: (dispatch, structId) => {
		const req = $.get('structures', {struct_id: structId});
		req.done((data) => {
			dispatch(receiveSubStructures(data));
		});
	}
}