import React, {Component} from 'react';
import _ from 'lodash';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.setLastName = this.setLastName.bind(this);
		this.setFirstName = this.setFirstName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {firstName: null, lastName: null}
	}

	onSubmit(e) {
		e.preventDefault();
		const {firstName, lastName} = this.state;
		this.props.onSubmit(firstName, lastName);
	}

	setLastName(e) {
		this.setState({lastName: e.target.value});
	}

	setFirstName(e) {
		this.setState({firstName: e.target.value});
	}


	render() {
		const {firstName, lastName} = this.state;
		return (
			<div className="form jumbotron">
				<form className="form-inline" onSubmit={this.onSubmit}>
					<div className="form-group">
						<div className="row">
							
							<div id="div-name" className="form-group  has-feedback">
  							<input type="text" className="form-control" placeholder="Nom" onChange={this.setLastName} />	
								<span id="icon-name" className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						
							</div>
							
							<div id="div-fname" className="form-group  has-feedback">
  							<input type="text" className="form-control" placeholder="Prénom" onChange={this.setFirstName} />		
								<span className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						  								
							</div>
																											
							<input type="submit" value="Valider" className="btn btn-success" disabled={_.isEmpty(firstName) && _.isEmpty(lastName)} />
							
						</div>
					</div>
				</form>
				<div id="msg">
				</div>
			</div>
		);
	}
}

export default SearchBar;