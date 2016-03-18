import React, {Component} from 'react';

class SearchBar extends Component {

	constructor(props) {
		super(props);
	}

	onSubmit() {
		console.log("submit")
	}

	render() {
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
																											
							<input type="submit" value="Valider" className="btn btn-success" />
							
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