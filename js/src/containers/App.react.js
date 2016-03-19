import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import SearchBar from '../components/SearchBar.react';
import UsersTable from '../components/UsersTable.react';

import {requestUsers} from '../actions/ApiActions';

class App extends Component {

	constructor(props) {
		super(props);
		this.requestUsers = this.requestUsers.bind(this);
	}

	componentDidMount() {
		console.log('mount');
	}

	requestUsers(firstName, lastName) {
		this.props.dispatch(requestUsers(firstName, lastName));
	}

	render() {
		console.log(this.props.users);
		return (
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-left">Trombinoscope</h1>
				</div>
				<div className="res_containt">
					<SearchBar onSubmit={this.requestUsers} />
					<UsersTable users={this.props.users} />
				</div>
				<Link to='show'>
					Click
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(App);