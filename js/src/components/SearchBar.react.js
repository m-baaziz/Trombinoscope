import React, {Component} from 'react';
import _ from 'lodash';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.setLastName = this.setLastName.bind(this);
		this.setFirstName = this.setFirstName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		const {firstName, lastName, options} = this.props;
		this.state = {firstName, lastName, options};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({options: nextProps.options});
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

	onCheckboxChange(e) {
		this.props.onOptionCheck(e.target.value);
	}

	render() {
		const {firstName, lastName, options} = this.state;
		return (
			<div className="form jumbotron">
				<form className="form-inline" onSubmit={this.onSubmit}>
					<div className="form-group">
						<div className="row">
							
							<div id="div-name" className="form-group  has-feedback">
  							<input type="text" className="form-control" placeholder="Nom" value={lastName} onChange={this.setLastName} />	
								<span id="icon-name" className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						
							</div>
							
							<div id="div-fname" className="form-group  has-feedback">
  							<input type="text" className="form-control" placeholder="Prénom" value={firstName} onChange={this.setFirstName} />		
								<span className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						  								
							</div>
																											
							<input type="submit" value="Valider" className="btn btn-success" disabled={_.isEmpty(firstName) && _.isEmpty(lastName)} />
							
						</div>
						<div className='row'>
							<div className="checkbox col-md-offset-4 col-md-4">
						   <label>
						     <input type="checkbox" value="photo" checked={_.includes(options, "photo")} onChange={this.onCheckboxChange} /> Photo
						   </label>
						 	</div>
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