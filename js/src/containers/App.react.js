import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import SearchBar from '../components/SearchBar.react';
import UsersTable from '../components/UsersTable.react';

import {requestUsers} from '../actions/ApiActions';
import {swapOption, selectUser} from '../actions/UsersActions';

class App extends Component {

	constructor(props, context) {
		super(props);
		context.router;
		this.requestUsers = this.requestUsers.bind(this);
		this.swapOption = this.swapOption.bind(this);
		this.selectUser = this.selectUser.bind(this);
	}

	componentDidMount() {
		const {first_name, last_name} = this.props.location.query;
		if (!_.isEmpty(first_name) || !_.isEmpty(last_name)) {
			this.props.dispatch(requestUsers(first_name, last_name));
		}
	}

	requestUsers(firstName, lastName) {
		this.props.dispatch(requestUsers(firstName, lastName));
		this.context.router.replace(`?first_name=${_.toString(firstName)}&last_name=${_.toString(lastName)}`, null)
	}

	selectUser(user) {
		this.props.dispatch(selectUser(user));
	}

	swapOption(option) {
		this.props.dispatch(swapOption(option));
	}

	render() {
		const {first_name, last_name} = this.props.location.query;
		const {users, options} = this.props;
		const onTitleClick = (e) => {
			window.location.href = "/";
		}
		return (
			<div className="container-fluid">
				<div className="page-header row">
					<div onClick={onTitleClick} className='cursor col-md-3'>
						<h1 className="text-left">Trombinoscope</h1>
					</div>
				</div>
				<div className="res_containt">
					<SearchBar firstName={first_name} lastName={last_name} options={options} onOptionCheck={this.swapOption} onSubmit={this.requestUsers} />
					<UsersTable users={users} options={options} onUserClick={this.selectUser} />
				</div>
			</div>
		);
	}
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.users.all,
    options: state.options
  }
}

export default connect(mapStateToProps)(App);