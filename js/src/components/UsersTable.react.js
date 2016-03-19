import React, {Component} from 'react';
import _ from 'lodash';

const USERS_PER_ROW = 4;

class UsersTable extends Component {

	constructor(props) {
		super(props);
		this.buildUserCell = this.buildUserCell.bind(this);
	}

	buildUserCell(user) {
		const { options } = this.props;
		return (
			<div key={user.login} className={`user-cell col-xs-${_.floor(12/USERS_PER_ROW)}`}>
				{
					_.includes(options, "photo") ? 
					(<div><img src={`https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=${user.login}`} alt='Photo indisponible' /></div>) :
					null
				}
				{
					_.map(_.omit(options, 'photo'), (option, index) => {
						return (
							<div key={index}>{user[option]}</div>
						);
					})
				}
			</div>
		);
	}

	render() {
		const {users, options} = this.props;
		const usersChunks = _.chunk(users, USERS_PER_ROW);
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