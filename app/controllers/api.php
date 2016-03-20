<?php
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method == 'GET') {
		$url = "";
		header('Content-Type: application/json');
		$service = explode('?', end(explode('/', $_SERVER['REQUEST_URI'])))[0];
		if ($service == "users") {
			if (strlen($_GET['first_name']) > 0 || strlen($_GET['last_name']) > 0) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/result?nom=".$_GET['last_name']."&prenom=".$_GET['first_name'];
			} elseif (strlen($_GET['primary_struct']) > 0 || strlen($_GET['secondary_struct']) > 0) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/resultstruct?pere=".$_GET['primary_struct']."&fils=".$_GET['secondary_struct'];
			}
			$data =  file_get_contents($url);
		} else {
			$data = "invalid request";
		}
		if ($service == "structures") {
			if (strlen($_GET['struct_id']) == 0) {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/structpere";
			} else {
				$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/structfils?lid=".$_GET['struct_id'];
			}
			$data =  file_get_contents($url);
		}
		echo $data;
	}
?>