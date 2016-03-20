import {getUsersByIdentity, getUsersByStructures, getStructures, getSubStructures} from '../utils/ApiUtils';

module.exports = {
	requestUsersByIdentity: (firstName, lastName) => {
		return (dispatch) => {
			getUsersByIdentity(dispatch, firstName, lastName);
		}
	},
	requestUsersByStructures: (primary, secondary) => {
		return (dispatch) => {
			getUsersByStructures(dispatch, primary, secondary);
		}
	},
	requestStructures: () => {
		return (dispatch) => {
			getStructures(dispatch);
		}
	},
	requestSubStructures: (structId) => {
		return (dispatch) => {
			getSubStructures(dispatch, structId);
		}
	}
}