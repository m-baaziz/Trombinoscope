function VerifChamp(champ)
{
	var pid = champ.parentNode.id;
	var divname = document.getElementById(pid);
	var submit = document.getElementById("submit");
	var letters = /^[A-Za-z]+$/;  
	if (!champ.value.match(letters)){			
			divname.className = "form-group has-error has-feedback";			
			return false;
		}else{
   			if(champ.value.length < 2){
				divname.className = "form-group has-warning has-feedback";
				return false;
   			}else{
				divname.className = "form-group has-success has-feedback";			
			return true;	
   			}
   		}
}



function VerifForm(form){	
	var name_verif = VerifChamp(document.getElementById("name"));
	var fname_verif = VerifChamp(document.getElementById("fname"));
	var btnOk = document.getElementById("submit");
	if (name_verif == true && fname_verif == true){	
		
		btnOk.removeAttribute("disabled");	
		btnOk.className= "btn btn-success";
		
		return true;
	}

	if(name_verif != true){
		if (document.getElementById("name").value.match(/^[A-Za-z]+$/){
			
		}
		document.getElementById('msg').innerHTML = '<div class="alert alert-warning" role="alert"><b>Attention !</b> veuillez rentrer un nom correcte</div>';	
	}else{
		if(fname_verif != true){
			document.getElementById('msg').innerHTML = '<div class="alert alert-warning" role="alert"><b>Attention !</b> veuillez rentrer un prénom correcte</div>';	
		}

	btnOk.className= "btn btn-default";
	btnOk.setAttribute("disabled" ,"true");		

}



	





//for succes input
//<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
//for warning input
//<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
//for error input
//<span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
