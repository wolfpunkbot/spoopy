<?php
	
	header('Content-Type: application/json;charset=utf-8');
	
	$data = $_POST["data"];
	$data = json_decode($data);
	
	$fileName = $_GET["fileName"];
	
	//CREATE JSON
	file_put_contents("assets/js/custom_levels/$fileName.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
	
	echo $data;
?>