import React, {Component} from 'react';
import _ from 'lodash';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.setLastName = this.setLastName.bind(this);
		this.setFirstName = this.setFirstName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onRadioChange = this.onRadioChange.bind(this);
		this.onStructureSelect = this.onStructureSelect.bind(this);
		this.onSubStructureSelect = this.onSubStructureSelect.bind(this);
		const {firstName, lastName, options, selectedStructure, selectedSecondaryStructure} = this.props;
		const searchType = _.includes(window.location.search, "struct") ? "structure" : "identity";
		this.state = {
			firstName, lastName, options, searchType, 
			primaryStructure: selectedStructure || null,
			secondaryStructure: selectedSecondaryStructure || 0};
	}

	componentWillReceiveProps(nextProps) {
		const {options, selectedSecondaryStructure} = nextProps;
		this.setState({options});
		if (_.xor(_.toArray(_.mapValues(this.props.subStructures, "structNomId")),_.toArray(_.mapValues(nextProps.subStructures, "structNomId"))).length > 0) {
			if (_.includes(_.toArray(_.mapValues(nextProps.subStructures, "structNomId")), _.toInteger(selectedSecondaryStructure))) {
				this.setState({secondaryStructure: selectedSecondaryStructure});
			} else {
				this.setState({secondaryStructure: nextProps.subStructures[0] ? nextProps.subStructures[0].structNomId : 0});
			}
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {firstName, lastName, primaryStructure, secondaryStructure, searchType} = this.state;
		const {structures, subStructures, onSubmitIdentity, onSubmitStructures} = this.props
		searchType == "identity" ? onSubmitIdentity(firstName, lastName) : onSubmitStructures(primaryStructure || structures[0].structNomId, secondaryStructure);
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

	onRadioChange(e) {
		this.setState({searchType: e.target.value});
	}

	onStructureSelect(e) {
		const {value} = e.target;
		this.setState({primaryStructure: value, secondaryStructure: 0});
		this.props.onStructureSelect(value);
	}

	onSubStructureSelect(e) {
		this.setState({secondaryStructure: e.target.value});
	}

	render() {
		const {firstName, lastName, options, primaryStructure, secondaryStructure, searchType} = this.state;
		const {structures, subStructures} = this.props;
		const buildCheckBox = (name, value) => {
			return (
				<div style={{marginLeft: "3px"}} className="checkbox">
			   <label>
			     <input type="checkbox" value={value} checked={_.includes(options, value)} onChange={this.onCheckboxChange} /> {name}
			   </label>
			 	</div>
			);
		}

		const buildRadio = (name, value) => {
			return (
				<div className="radio">
				  <label><input type="radio" name="searchType" value={value} checked={this.state.searchType == value} onChange={this.onRadioChange} />{name}</label>
				</div>
			)
		}

		const textInputs = (
			<div>
				<div id="div-name" className="form-group has-feedback">
					<input type="text" className="form-control" placeholder="Nom" value={lastName} onChange={this.setLastName} />	
					<span id="icon-name" className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						
				</div>
				
				<div id="div-fname" className="form-group has-feedback">
					<input type="text" className="form-control" placeholder="Prénom" value={firstName} onChange={this.setFirstName} />		
					<span className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						  								
				</div>
			</div>
		);

		const selectInputs = (
			<div className="form-group">
	      <select className="form-control" value={primaryStructure} onChange={this.onStructureSelect}>
	        {_.map(structures, (struct, index) => {
	        	return (
	        		<option key={index} value={struct.structNomId}> 
	        			{struct.structureLibelle}
	        		</option>
	        	)
	        })}
	      </select>
	      <select className="form-control" value={secondaryStructure} onChange={this.onSubStructureSelect}>
	        {_.map(subStructures, (struct, index) => {
	        	return (
	        		<option key={index} value={struct.structNomId}> {
	        			struct.structureLibelle}
	        		</option>
	        	)
	        })}
	      </select>
	    </div>
		)

		return (
			<div className="form jumbotron">
				<div className="form-group">
					{buildRadio("Identité", "identity")}
					{buildRadio("Structure", "structure")}
				</div>
				<form className="form-inline" onSubmit={this.onSubmit}>
					<div className="form-group">
						<div className="row">

							{searchType == "identity" ? textInputs : selectInputs}
																											
							<input type="submit" value="Valider" style={{marginLeft: '3px'}} className="btn btn-success" disabled={_.isEmpty(firstName) && _.isEmpty(lastName) && searchType == "identity"} />
							
						</div>
						<div className='row'>
							{buildCheckBox('photo', 'photo')}
							{buildCheckBox('structure', 'structure')}
							{buildCheckBox('nom', 'nom')}
							{buildCheckBox('e-mail', 'mail')}
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