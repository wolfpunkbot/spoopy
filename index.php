<!--

KNOWN ISSUES:
-- triggerBeam() interval not clearing

TO DO:
-- ADD SPLASH SCREEN
-- ADD ABILITY TO SAVE LEVEL AND RETURN (LOCAL STORAGE)
-- ADD CUSTOM SKELE GEAR IF YOU PICK UP CERTAIN STUFF?
-- TOGGLE SOUND ICON ON/OFF

-->

<?php
	$siteURL = 'http://192.168.1.8/projects/games/SPOOPY/';
	$builder = $_GET['builder'];
?>

<!DOCTYPE html>
<html lang="en">

	<head>
		<title>Spoopy</title>
		<link rel="shortcut icon" href="assets/images/characters/default.gif">
		<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet" />
		<!--<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">-->
	</head>
	
	<body>
		
		<section class="gameContainer">
			<div id="gameBoard" class="centered"></div>
		</section>
		
		<section id="myInventory" class="padding--lg">
			
			<div id="myKeys" class="flex">
				<h1>Keys:</h1>
				<div class="padding-lr-sm"></div>
			</div>
			
			<div id="myBones" class="flex">
				<h1>Bones:</h1>
				<div class="padding-lr-sm"></div>
			</div>
			
			<div id="resetBtn">
				<button onclick="reset();">Click to Reset Levels</button>
			</div>
			
		</section>
		
		<div id="chickenDinner" class="hidden">YOU WON!</div>
		<div id="message" class="centered padding-tb-md hidden"></div>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script type="text/javascript"src="assets/fa/da7246007f.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
		<script type="text/javascript" src="assets/js/main.js"></script>
		
		<?php
			if ($builder == true) {
				echo '<script>console.log("loading builder.js");</script>';
				echo '<script type="text/javascript" src="assets/js/builder.js"></script>';
			}
		?>
		
	</body>
</html>