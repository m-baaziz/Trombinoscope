require("react-bootstrap-switch/src/less/bootstrap3/build.less");

import React, {Component} from 'react';
import Switch from 'react-bootstrap-switch';
import _ from 'lodash';

const REGEXP = /^[A-Za-z]+$/;

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.setName = this.setName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onRadioChange = this.onRadioChange.bind(this);
		this.onStructureSelect = this.onStructureSelect.bind(this);
		this.onSubStructureSelect = this.onSubStructureSelect.bind(this);
		this.buildMessageContent = this.buildMessageContent.bind(this);
		const {firstName, lastName, options, selectedStructure, selectedSecondaryStructure} = this.props;
		const searchType = _.includes(window.location.search, "struct") ? "structure" : "identity";
		this.state = {
			firstName: firstName || "",
			lastName: lastName || "",
			firstNameStatus: "pending",
			lastNameStatus: "pending",
			options, 
			searchType,
			primaryStructure: selectedStructure || null,
			secondaryStructure: selectedSecondaryStructure || 0
		};
	}

	componentWillReceiveProps(nextProps) {
		const {options, subStructures} = nextProps;
		this.setState({options});
		const structIdArray =  _.map(subStructures, struct => {
			return struct.structure.structId;
		})
		const sameStructure = _.includes(structIdArray, _.toInteger(this.state.secondaryStructure));
		if (!_.isEmpty(subStructures) && !sameStructure) {
			this.setState({secondaryStructure: subStructures[0].structure.structId});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {firstName, lastName, primaryStructure, secondaryStructure, searchType} = this.state;
		const {structures, subStructures, onSubmitIdentity, onSubmitStructures} = this.props
		searchType == "identity" ? onSubmitIdentity(firstName, lastName) : onSubmitStructures(primaryStructure || structures[0].structure.structId, secondaryStructure);
	}

	setName(key, e) {
		const {value, parentElement} = e.target;
		let status = "pending";
		if (!_.isEmpty(value) && !value.match(REGEXP)) {
			status = "warning";
		} else {
			if (value.length > 1) {
				status = "ok";
			}
		}
		this.setState({[key]: value, [`${key}Status`]: status});
	}

	onCheckboxChange(e) {
		this.props.onOptionCheck(e.target.value);
	}

	onRadioChange(e) {
		this.setState({searchType: e ? "identity" : "structure"});
	}

	onStructureSelect(e) {
		const {value} = e.target;
		this.setState({primaryStructure: value, secondaryStructure: 0});
		this.props.onStructureSelect(value);
	}

	onSubStructureSelect(e) {
		this.setState({secondaryStructure: e.target.value});
	}

	buildMessageContent() {
		const {firstNameStatus, lastNameStatus} = this.state;
		let invalidFields = [];
   	if (firstNameStatus == "warning") {
      invalidFields.push("Prénom");
   	}
   	if (lastNameStatus == "warning") {
      invalidFields.push("Nom");
   	}
		const fieldsErrors = _.map(invalidFields, (field, index) => {
			return (
				<div key={index}><b>Attention !</b> Le {field} ne doit contenir que des lettres</div>
			)
		});

		const apiErrors = _.map(this.props.errors, (error, index) => {
			return (
				<div key={index}>{error}</div>
			)
		});

		const msg = _.concat(apiErrors, ...fieldsErrors);
		return !_.isEmpty(msg) ?
			(<div className="alert alert-danger" role="alert">
				{msg}
			</div>) : null
	}

	render() {
		const {firstName, lastName, options, primaryStructure, secondaryStructure, searchType, firstNameStatus, lastNameStatus} = this.state;
		const {structures, subStructures, form} = this.props;
		const messageContent = this.buildMessageContent();

		const isSubmitDisabled = (firstNameStatus == "warning" || lastNameStatus == "warning" || (_.isEmpty(firstName) && _.isEmpty(lastName)) || (!_.isEmpty(firstName) && firstName.length < 2) || (!_.isEmpty(lastName) && lastName.length < 2)) && searchType == "identity";

		const buildCheckBox = (name, value) => {
			return (
				<div style={{marginLeft: "3px"}} className="checkbox ">
			   <label>
			     <input type="checkbox" value={value} checked={_.includes(options, value)} onChange={this.onCheckboxChange} /> {name}
			   </label>
			 	</div>
			);
		}

		const getInputIconClass = field => {
			switch(this.state[`${field}Status`]) {
				case "warning" :
					return "glyphicon glyphicon-warning-sign form-control-feedback"
				case "pending" :
				 	return "glyphicon glyphicon-pencil form-control-feedback"
				case "ok" :
					return "glyphicon glyphicon-ok form-control-feedback"
				default :
					return "";
			}
		}

		const textInputs = (
			[
				<div key={1} className="form-group has-feedback">
					<input type="text" className="form-control input-text" placeholder="Nom" value={lastName} onChange={this.setName.bind(this, "lastName")} />	
					<span id="icon-name" className={getInputIconClass("lastName")} ariaHidden="true"></span>
					<span id="input-name" className="sr-only">(success)</span>
				</div>,
				<div key={2} className="form-group has-feedback">
					<input type="text" className="form-control input-text" placeholder="Prénom" value={firstName} onChange={this.setName.bind(this, "firstName")} />		
					<span className={getInputIconClass("firstName")} ariaHidden="true"></span>  								  						  								
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

		const bodyForm = (
			<div className="form jumbotron body-form">
				<div className="row">
					<Switch
						state={searchType == "identity"}
						onText="Identité"
						offText="Structure"
						onColor="success"
						offColor="warning"
						onChange={this.onRadioChange}
						labelWidth="0"
					/>
					<form className="form-inline" onSubmit={this.onSubmit}>
					
						{searchType == "identity" ? textInputs : selectInputs}
																										
						<input type="submit" value="Valider" style={{marginLeft: '3px'}} className={`btn ${isSubmitDisabled ? '' : 'btn-success'}`} disabled={isSubmitDisabled} />
						<div className='checkbox-wrapper'>
							{buildCheckBox('photo', 'photo')}
							{buildCheckBox('structure', 'structure')}
							{buildCheckBox('nom', 'nom')}
							{buildCheckBox('e-mail', 'mail')}
						</div>
					</form>
				</div>
				<div className='error-message' style={{marginTop: '5px'}}>
						{messageContent}
				</div>
			</div>
		);

		const headerForm = (
			<div className='header-form'>
				<form className="form-inline" onSubmit={this.onSubmit}>
					<div className='checkbox-wrapper'>
						{buildCheckBox('photo', 'photo')}
						{buildCheckBox('structure', 'structure')}
						{buildCheckBox('nom', 'nom')}
						{buildCheckBox('e-mail', 'mail')}
					</div>
					<Switch
							state={searchType == "identity"}
							onText="Identité"
							offText="Structure"
							onColor="success"
							offColor="warning"
							onChange={this.onRadioChange}
							labelWidth="0"
						/>
					{searchType == "identity" ? textInputs : selectInputs}
					<button type="submit" className={`btn ${isSubmitDisabled ? '' : 'btn-success'} submit-button`} disabled={isSubmitDisabled}>
						<i className='glyphicon glyphicon-ok' />
					</button>
				</form>
				<div className='error-message'>
						{messageContent}
				</div>
			</div>
		);

		return (
			<div>
				{form == 'header' ? headerForm : bodyForm}
			</div>
		);

	}
}

export default SearchBar;