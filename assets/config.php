<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	$siteURL = 'http://localhost/spoopy/';
	
	if (!empty($_GET['builder'])) {
		$builder = $_GET['builder'];
	} else {
		$builder = "";
	}
	
?>
