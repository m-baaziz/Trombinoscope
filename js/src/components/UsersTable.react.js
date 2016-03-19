import React, {Component} from 'react';
import _ from 'lodash';

const USERS_PER_ROW = 4;

class UsersTable extends Component {

	constructor(props) {
		super(props);
	}

	buildUserCell(user) {
		return (
			<div key={user.login} className={`col-md-${_.floor(12/USERS_PER_ROW)}`}>
				<img src={`https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=${user.login}`} />
			</div>
		);
	}

	render() {
		const usersChunks = _.chunk(this.props.users, USERS_PER_ROW);
		const buildUsersLine = chunk => {
			return _.map(chunk, user => {
				return this.buildUserCell(user);
			});
		}
		const rows = _.map(usersChunks, (chunk, index) => {
			return (
				<div key={index} className='row'>
					{buildUsersLine(chunk)}
				</div>
			);
		})
		return (
			<div>
				{rows}
			</div>
		);
	}
}

export default UsersTable;