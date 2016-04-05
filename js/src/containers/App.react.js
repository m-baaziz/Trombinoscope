import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import SearchBar from '../components/SearchBar.react';
import UsersTable from '../components/UsersTable.react';

import {requestUsersByIdentity, requestUsersByStructures, requestStructures, requestSubStructures} from '../actions/ApiActions';
import {swapOption, selectUser} from '../actions/UsersActions';
import {clearSubStructures} from '../actions/StructuresActions';
import {clearErrors} from '../actions/ErrorsActions';

class App extends Component {

	constructor(props, context) {
		super(props);
		context.router;
		this.requestUsersByIdentity = this.requestUsersByIdentity.bind(this);
		this.requestUsersByStructures = this.requestUsersByStructures.bind(this);
		this.requestSubStructures = this.requestSubStructures.bind(this);
		this.swapOption = this.swapOption.bind(this);
		this.selectUser = this.selectUser.bind(this);
		this.state = {initialSubStructuresLoaded: false};
	}

	componentDidMount() {
		const {dispatch, users, structures} = this.props;
		const {first_name, last_name, primary_struct, secondary_struct} = this.props.location.query;
		if ((!_.isEmpty(first_name) || !_.isEmpty(last_name)) && _.isEmpty(users)) {
			dispatch(requestUsersByIdentity(first_name, last_name));
		}
		if (_.isEmpty(structures)) {
			dispatch(requestStructures());
			if (!_.isEmpty(primary_struct)) {
				dispatch(requestSubStructures(primary_struct));
				if (!_.isEmpty(secondary_struct)) {
					dispatch(requestUsersByStructures(primary_struct, secondary_struct));
				}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const {dispatch, subStructures, errors} = this.props;
		if (!this.state.initialSubStructuresLoaded && _.isEmpty(subStructures) && !_.isEmpty(nextProps.structures)) {
			dispatch(requestSubStructures(nextProps.structures[0].structNomId));
			this.setState({initialSubStructuresLoaded: true});
		}
		if (_.isEmpty(errors) && !_.isEmpty(nextProps.errors)) {
			setTimeout(() => {
				dispatch(clearErrors())
			}, 3000);
		}
	}

	requestUsersByIdentity(firstName, lastName) {
		this.props.dispatch(requestUsersByIdentity(firstName, lastName));
		this.context.router.replace(`?first_name=${_.toString(firstName)}&last_name=${_.toString(lastName)}`, null)
	}

	requestUsersByStructures(primary, secondary) {
		this.props.dispatch(requestUsersByStructures(primary, secondary));
		this.context.router.replace(`?primary_struct=${_.toString(primary)}&secondary_struct=${_.toString(secondary)}`, null)
	}

	selectUser(user) {
		this.props.dispatch(selectUser(user));
	}

	requestSubStructures(structId) {
		this.props.dispatch(requestSubStructures(structId));
	}

	swapOption(option) {
		this.props.dispatch(swapOption(option));
	}

	render() {
		const {first_name, last_name, primary_struct, secondary_struct} = this.props.location.query;
		const {users, options, structures, subStructures, errors} = this.props;
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
					<SearchBar
						firstName={first_name}
						lastName={last_name} options={options}
						structures={structures}
						subStructures={subStructures}
						selectedStructure={primary_struct}
						selectedSecondaryStructure={secondary_struct}
						onOptionCheck={this.swapOption}
						onStructureSelect={this.requestSubStructures}
						onSubmitIdentity={this.requestUsersByIdentity}
						onSubmitStructures={this.requestUsersByStructures}
						errors={errors}
					/>
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
    options: state.options,
    structures: state.structures.primary,
    subStructures: state.structures.secondary,
    errors: state.errors
  }
}

export default connect(mapStateToProps)(App);