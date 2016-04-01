<?php
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method == 'GET') {
		$url = "";
		$regex = "/^[A-Za-z ]+$/";
		header('Content-Type: application/json; charset=utf-8');
		http_response_code(200);
		$service = explode('?', end(explode('/', $_SERVER['REQUEST_URI'])))[0];

		if ($service == "users") {
			if ((strlen($_GET['first_name']) > 0 && preg_match($regex, $_GET['first_name'])) || 
					(strlen($_GET['last_name']) > 0 && preg_match($regex, $_GET['last_name']))) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/result?nom=".$_GET['last_name']."&prenom=".$_GET['first_name'];
			} elseif (strlen($_GET['primary_struct']) > 0 || strlen($_GET['secondary_struct']) > 0) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/resultstruct?pere=".$_GET['primary_struct']."&fils=".$_GET['secondary_struct'];
			}
			if (strlen($url) > 0) {
				$data =  file_get_contents($url);
			}
		}

		if ($service == "structures") {
			if (strlen($_GET['struct_id']) == 0) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/structpere";
			} else {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/structfils?lid=".$_GET['struct_id'];
			}
			if (strlen($url) > 0) {
				$data =  file_get_contents($url);
			}
		}

		if (strlen($url) == 0) {
			http_response_code(422);
			$data = "Requête invalide, veuillez vérifier vos paramètres.";
		} elseif ($data == "[ ]") {
			http_response_code(200);
			$data = "Aucun résultat";
		}

		echo $data;
	}
?>