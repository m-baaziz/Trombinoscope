import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {requestUsersByIdentity} from '../actions/ApiActions';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	componentDidMount() {
		const {dispatch, user, location} = this.props;
		if (_.isEmpty(user.nom)) {
			dispatch(requestUsersByIdentity(location.query.first_name, location.query.last_name));
		}
	}

	onImgError(e) {
		e.target.src = "../../app/assets/images/profil.jpg";
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		const { user } = this.props;
		const nameArray = user.nom.split(' ');
		const lastName = _.remove(nameArray, block => {return block == _.toUpper(block)}).join('')
		const firstName = nameArray.join(' ');
		const infos = _.map(_.keys(_.omit(user, ["nom", "prenom", "photo"])), (key, index) => {
										return (
											<div key={index} className="row	">
												<div className="col-md-4 col-sm-4 col-xs-6 "><p >{key == "sousStructure" ? "sous-structure" : key}:</p> </div>
												<div className="col-md-8 col-sm-8 col-xs-6"><p>{_.isEmpty(user[key]) ? "N/A" : user[key]}</p> </div>												
											</div>											
										);
									});
		return (
			<div className="container-fluid">
				<div className="page-header row">
	        <div onClick={this.goBack} className='cursor col-md-3'>
	          <h1 className="text-left">Trombinoscope</h1>
	        </div>
	        <div>
	          <h1><small>{user.nom}</small></h1>
	        </div>
        </div>
				<div className="jumbotron">
					<div className="row id-card">
						<div className="photo col-sm-4">
							<img src={`https://demeter.utc.fr/portal/pls/portal30/portal30.get_photo_utilisateur_mini?username=${user.login}`} onError={this.onImgError} className="img-rounded img-responsive"/>
						</div>
						<div className="info col-sm-8">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-4 col-sm-4 col-xs-6 "><p>Nom:</p> </div>
									<div className="col-md-8 col-sm-8 col-xs-6"><p>{lastName}</p> </div>								
								</div>
								<div className="row">
									<div className="col-md-4 col-sm-4 col-xs-6 "><p>Prenom:</p> </div>
									<div className="col-md-8 col-sm-8 col-xs-6"><p>{firstName}</p> </div>								
								</div>															
								{infos}							
							</div>															
						</div>
					</div>
					<button onClick={this.goBack} type="button" className="btn btn-primary btn-back">
           	<b> Retour</b>
         	</button>
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