import keyMirror from 'keymirror';

module.exports = {
	ActionTypes: keyMirror({
		REQUEST_USERS: null,
		RECEIVE_USERS: null,
		SELECT_USER: null,
		SWAP_OPTION: null,
		REQUEST_STRUCTURES: null,
		RECEIVE_STRUCTURES: null,
		REQUEST_SUB_STRUCTURES: null,
		RECEIVE_SUB_STRUCTURES: null,
		CLEAR_SUB_STRUCTURES: null,
		ADD_ERROR: null,
		CLEAR_ERRORS: null
	})
}