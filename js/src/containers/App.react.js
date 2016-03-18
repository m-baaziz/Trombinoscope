import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {requestUsers} from '../actions/ApiActions';

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('mount');
		this.props.dispatch(requestUsers("mister", "tchiky"));
	}

	render() {
		console.log(this.props.users);
		return (
			<div>
				This is the react part !!
				<br />
				TEST TEST
				<br />
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