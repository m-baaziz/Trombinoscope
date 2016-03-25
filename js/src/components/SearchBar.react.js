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
		this.messageContent = this.messageContent.bind(this);
		const {firstName, lastName, options, selectedStructure, selectedSecondaryStructure} = this.props;
		const searchType = _.includes(window.location.search, "struct") ? "structure" : "identity";
		this.state = {
			firstName: firstName || "", lastName: lastName || "", options, searchType, 
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
				this.setState({secondaryStructure: nextProps.subStructures[0] ? nextProps.subStructures[0].structure.structId : 0});
			}
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {firstName, lastName, primaryStructure, secondaryStructure, searchType} = this.state;
		const {structures, subStructures, onSubmitIdentity, onSubmitStructures} = this.props
		searchType == "identity" ? onSubmitIdentity(firstName, lastName) : onSubmitStructures(primaryStructure || structures[0].structure.structId, secondaryStructure);
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

	messageContent() {
		const {firstName, lastName} = this.state;
		let invalidFields = [];
		const regExp = /^[A-Za-z]+$/;
		if (!_.isEmpty(firstName) && !firstName.match(regExp)) {
			invalidFields.push("Prénom");
		}
		if (!_.isEmpty(lastName) && !lastName.match(regExp)) {
			invalidFields.push("Nom");
		}
		const errors = _.map(invalidFields, (field, index) => {
			return (
				<div className="alert alert-danger" key={index} role="alert"><b>Attention !</b> Le {field} ne doit contenir que des lettres</div>
			)
		})

		return errors;
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
			[
				<div id="div-name" key={1} className="form-group has-feedback">
					<input type="text" className="form-control" placeholder="Nom" value={lastName} onChange={this.setLastName} />	
					<span id="icon-name" className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>
					<span id="input-name" className="sr-only">(success)</span>
				</div>,
				<div id="div-fname" key={2} className="form-group has-feedback">
					<input type="text" className="form-control" placeholder="Prénom" value={firstName} onChange={this.setFirstName} />		
					<span className="glyphicon glyphicon-pencil form-control-feedback" ariaHidden="true"></span>  								  						  								
					<span id="input-fname" className="sr-only">(success)</span>
				</div>
			]
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
	        		<option key={index} value={struct.structure.structId}> {
	        			struct.structureLibelle}
	        		</option>
	        	)
	        })}
	      </select>
	    </div>
		)

		const isSubmitDisabled = () => {
			return !_.isEmpty(this.messageContent() || (_.isEmpty(firstName) && _.isEmpty(lastName)) || (!_.isEmpty(firstName) && firstName.length < 2) || (!_.isEmpty(lastName) && lastName.length < 2)) && searchType == "identity";
		}

		return (
			<div className="form jumbotron">
				<div className="row">
					<div className="form-group">
						{buildRadio("Identité", "identity")}
						{buildRadio("Structure", "structure")}
					</div>
					<form className="form-inline" onSubmit={this.onSubmit}>
						{searchType == "identity" ? textInputs : selectInputs}
																										
						<input type="submit" value="Valider" style={{marginLeft: '3px'}} className={`btn ${isSubmitDisabled() ? '' : 'btn-success'}`}
							disabled={isSubmitDisabled()}
						/>
						<div className='row'>
							{buildCheckBox('photo', 'photo')}
							{buildCheckBox('structure', 'structure')}
							{buildCheckBox('nom', 'nom')}
							{buildCheckBox('e-mail', 'mail')}
						</div>
					</form>
				</div>
				<div id="msg">
					{this.messageContent()}
				</div>
			</div>
		);
	}
}

export default SearchBar;