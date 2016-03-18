import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import SearchBar from '../components/SearchBar.react';

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
			<div className="container-fluid">
				<div className="page-header"><h1 className="text-left">Trombinoscope SR03</h1></div>
				<div className="res_containt">
					<SearchBar />
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