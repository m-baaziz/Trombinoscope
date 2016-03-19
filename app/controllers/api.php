<?php
	$method = $_SERVER['REQUEST_METHOD'];
	if ($method == 'GET') {
		header('Content-Type: application/json');
		$url = "https://webapplis.utc.fr/Trombi_ws/mytrombi/result?nom=".$_GET['last_name']."&prenom=".$_GET['first_name'];
		$data =  file_get_contents($url);
		echo $data;
	}
?>