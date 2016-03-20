import keyMirror from 'keymirror';

module.exports = {
	ActionTypes: keyMirror({
		REQUEST_USERS: null,
		RECEIVE_USERS: null,
		SELECT_USER: null,
		SWAP_OPTION: null
	})
}