import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {requestUsers} from '../actions/ApiActions';

class Profile extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {dispatch, user, location} = this.props;
		if (_.isEmpty(user.nom)) {
			dispatch(requestUsers(location.query.first_name, location.query.last_name));
		}
	}

	onImgError(e) {
		e.target.src = "../../app/assets/images/profil.jpg";
	}

	render() {
		const { user } = this.props;
		const nameArray = user.nom.split(' ');
		const lastName = _.remove(nameArray, block => {return block == _.toUpper(block)}).join('')
		const firstName = nameArray.join(' ');
		const infos = _.map(_.omit(_.keys(user), ["nom", "prenom", "photo"]), (key, index) => {
										return (
											<p key={index}>
												{key}: {user[key]}
											</p>
										);
									});
		return (
			<div className="container-fluid">
				<div className="page-header"><h1 className="text-left">Trombinoscope <small>{user.nom}</small></h1></div>
				<div className="jumbotron">
					<div className="row">
						<div className="photo col-md-4">
							<div>
								<img src={`https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=${user.login}`} onError={this.onImgError} className="img-rounded"/>
							</div>				
						</div>
						<div className="info col-md-8">
							<div>
								<p>Nom: {lastName}</p>
								<p>Prenom: {firstName}</p>
								{infos}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  	users: state.users.all,
    user: state.users.selected || Object.assign({}, {nom: "", login: ""})
  }
}

export default connect(mapStateToProps)(Profile);