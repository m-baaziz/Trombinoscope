import React, {Component} from 'react';
import _ from 'lodash';

const USERS_PER_ROW = 4;

class UsersTable extends Component {

	constructor(props) {
		super(props);
	}

	buildUserCell(user) {
		return (
			<div key={user.login} className={`user-cell col-xs-${_.floor(12/USERS_PER_ROW)}`}>
				<img src={`https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=${user.login}`} alt='Photo indisponible' />
			</div>
		);
	}

	render() {
		const {users, options} = this.props;
		const usersChunks = _.chunk(users, USERS_PER_ROW);
		const buildUsersLine = chunk => {
			return _.map(chunk, user => {
				return _.includes(options, "photo") ? this.buildUserCell(user) : null;
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