

<!--


KNOWN ISSUES:
-- SIZING ISSUES ON OTHER SCREENS


TO DO:
-- ADD SPLASH SCREEN
-- ROTATE BONES TO FIT WITH KEYS
-- CLEAN UP ANIMATION
-- MADE CODE MORE MODULAR IN ORDER TO SCALE
-- SPLIT INVENTORY SO KEYS AND BONES ARE SEPARATE
-- ADD LEVEL 2
-- ADD ABILITY TO SAVE LEVEL AND RETURN (LOCAL STORAGE)
-- ADD CUSTOM SKELE GEAR IF YOU PICK UP CERTAIN STUFF?

-->


<!DOCTYPE html>
<html lang="en">

	<head>
		<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet">
	</head>
	
	<style>
		h1 {
			font-family: 'Creepster', cursive;
		}
		body {
			height: 100vh;
			width: 100vw;
			background-color: #69746b;
			overflow: hidden;
		}
		#gameBoard {
			position: relative;
			background-color: #69746b;
			border: 1px solid #69746b;
		}
		.container--1200 {
			height: 1200px;
			width: 1200px;
			overflow: hidden;
		}
		.gameLine div {
			outline: 1px solid #606A62;
			width: 60px;
			height: 60px;
			line-height: 60px;
			//padding: 1px;
			//transition: left 1s;
			z-index: 1;
			position: relative;
		}
		#player {
			z-index: 2;
		}
		img {
			max-height: 60px;
			width: auto;
		}
		.walkLeft {
			-webkit-transform: scaleX(-1);
			transform: scaleX(-1);
		}
		i {
			position: absolute!important;
			z-index: -1;
			font-size: 2.5em;
			line-height: 60px!important;
		}
		.fa-question-square {
			top: 30%;
			left: 50%;
			transform: translate(-50%, -25%);
			color: #222;
		}
		.fa-jack-o-lantern {
			transform: translate(-50%, 0%);
			color: #DC7633;
		}
		.fa-lock {
			top: 30%;
			left: 50%;
			transform: translate(-50%, -25%);
			font-size: 1em;
			width: 40px;
			align-items: center;
			justify-content: center;
			text-align: center;
			height: auto;
			line-height: 40px!important;
		}
		.fa-bone {
			font-size: 1.6em;
			width: 40px;
			align-items: center;
			justify-content: center;
			text-align: center;
			height: auto;
			line-height: 40px!important;
			color: white;
			text-shadow: 2px 5px 3px #222;
			margin-top: 3px;
		}
		.faKey {
			top: 30%;
			left: 50%;
			transform: translate(-50%, -25%);
		}
		.Key_yellow {
			color: #F1C40F;
			text-shadow: 2px 5px 3px #222;
		}
		.Key_red {
			color: #E74C3C;
			text-shadow: 2px 5px 3px #222;
		}
		.Key_blue {
			color: #3498DB;
			text-shadow: 2px 5px 3px #222;
		}
		.Key_green {
			color: #27AE60;
			text-shadow: 2px 5px 3px #222;
		}
		.stopBlock {
			background-color: #636363;
			border: 10px outset grey;
		}
		.Door_yellow {
			background-color: #F1C40F;
			border: 10px outset grey;
			width: 100%;
			padding: 0;
			margin-top: -3px;
		}
		.Door_red {
			background-color: #E74C3C;
			border: 10px outset grey;
			width: 100%;
			padding: 0;
			margin-top: -3px;
		}
		.Door_blue {
			background-color: #3498DB;
			border: 10px outset grey;
			width: 100%;
			padding: 0;
			margin-top: -3px;
		}
		.Door_green {
			background-color: #27AE60;
			border: 10px outset grey;
			width: 100%;
			padding: 0;
			margin-top: -3px;
		}
		.Door_master {
			background-color: #222;
			border: 10px outset #222;
			width: 100%;
			padding: 0;
			margin-top: -3px;
			top: 30%;
			left: 50%;
			transform: translate(-50%, -25%);
			font-size: 1em;
			align-items: center;
			justify-content: center;
			text-align: center;
			height: auto;
			line-height: 40px!important;
			font-size: 1.8em;
			color: white;
		}
		.endPortal {
			background-color: #222;
			border: 10px outset #222;
			width: 100%;
			padding: 0;
			margin-top: -3px;
			top: 30%;
			left: 50%;
			transform: translate(-50%, -25%);
			font-size: 1em;
			align-items: center;
			justify-content: center;
			text-align: center;
			height: auto;
			line-height: 40px!important;
			font-size: 1.8em;
			color: #E67E22;
			text-shadow: 2px 2px #222;
			position: absolute;
		}
		.collectedKeys {
			position: relative!important;
		}
		#myInventory {
			height: 100px;
		}
		#myInventory h1 {
			align-items: center;
			font-size: 2em;
			color: white;
			text-shadow: 2px 3px 4px #222;
			font-weight: 400;
		}
		#myInventory div {
			font-size: 1em;
			text-shadow: 5px 5px #222;
		}
		#message {
			font-size: 2.5em;
		}
		#chickenDinner {
			max-height: 120vh;
			max-width: 100vw;
			color: #E67E22;
			background-color: #69746b;
			width: 100%;
			height: 120vh;
			line-height: 100vh;
			position: absolute;
			top: 0%;
			left: 10%;
			transform: translate(-10%, -10%);
			z-index: 10;
			text-align: center;
			align-items: center;
			//outline: 1px solid blue;
			font-size: 5em;
		}
		.fa-spin {
			top: 45%;
			left: 41.4%;
		}
	</style>
	
	<body>
		
		<section>
			<div class="container--900" style="padding-top: 100px;">
				<div id="myInventory" class="flex">
					<h1>Items Collected:</h1>&nbsp;<div></div>
					</div>
				<div id="gameBoard" class="centered"></div>
				<div id="chickenDinner" class="hidden">YOU WON!</div>
				<div id="message" class="centered padding-tb-md"></div>
				<!--
				<div id="joyStick">
					<div class="stickControl padding-lr-xl jc--c centered debug" style="height: 15vh;"><i class="fas fa-arrow-up"></i></div>
					<div class="flex jc--sb" style="height: 15vh;">
						<div class="stickControl padding-lr-xl padding-tb-sm max-width--20 max-width--50"><i class="fas fa-arrow-left"></i></div>
						<button class="stickControl padding-lr-xl padding-tb-sm max-width--20 max-width--50"><i class="fas fa-arrow-right"></i></button>
					</div>
					<div class="stickControl padding-lr-xl jc--c centered debug" style="height: 15vh;"><i class="fas fa-arrow-down"></i></div>
				</div>
				-->
			</div>
		</section>
		
		<script src="assets/fa/da7246007f.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
		<script>
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			var devDebug = false;
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			$(document).ready(function() {
				createBoard(); //CREATE BOARD HTML ELEMENTS
				createGame(); //CREATE GAME/LEVEL AND ADD PLAYER - ACCEPTS "LEVEL" AS ARGUMENT
			});
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			//INITIATE MASTER VARIABLES
			var totalMaps = 2;
			var amount = 0;
			var boardBoundaryBlocks, interactable = [];
			var boardSize = 15;
			var totalSquares = 225;
			var canMove = true;
			var level, levelKeys, flip, direction, num, totalItems, startingSquare, helpMsg, helpBlockLoc, endPortal, masterDoorNum = '';
			
			//ALL SIDE NUMBERS OF THE BOARD
			var board_TOP = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
			var board_LEFT = ['1', '16', '31', '46', '61', '76', '91', '106', '121', '136', '151', '166', '181', '196', '211'];
			var board_RIGHT = ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180', '195', '210', '225'];
			var board_BOTTOM = ['211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225'];
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			//CREATE THE GAME BOARD
			function createBoard() {
				for (let i = 1; i <= boardSize; i++) {
					$('#gameBoard').append('<div class="flex gameLine">');
				}
				$('.gameLine').each(function(index) {
					for (let i = 1; i <= boardSize; i++) {
						$(this).append('<div></div>');
					}
				});
				let num = 1;
				$('.gameLine div').each(function(index) {
					if (devDebug == true) {
						$(this).html(num);
					}
					$(this).attr('data-sq', num);
					num++
				});
			}
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			//UPDATE PLAYER LOCATION
			function updatePlayerPos(oldPos, newPos, arrow) {
				if (newPos > 0 && newPos <= totalSquares) { //STOP PLAYER FROM MOVING OUTSIDE THE BOARD
					//console.log(arrow + ': ' + oldPos + ' -> ' + newPos);
					var canMove = true;
					var flip, direction, num = '';
					
					// ##################################################################################
					// ##################################################################################
					// ##################################################################################
					
					//STOPS PLAYER FROM MAKING AN ILLEGAL LEFT MOVE
					if ( arrow == 'LEFT' && board_LEFT.includes(oldPos.toString()) && board_RIGHT.includes(newPos.toString()) ) {
						canMove = false;
					}
					//STOPS PLAYER FROM MAKING AN ILLEGAL RIGHT MOVE
					if ( arrow == 'RIGHT' && board_RIGHT.includes(oldPos.toString()) && board_LEFT.includes(newPos.toString()) ) {
						canMove = false;
					}
					//STOPS PLAYER FROM MAKING AN ILLEGAL TOP MOVE
					if ( arrow == 'UP' && board_TOP.includes(oldPos.toString()) ) {
						canMove = false;
					}
					//STOPS PLAYER FROM MAKING AN ILLEGAL TOP MOVE
					if ( arrow == 'DOWN' && board_BOTTOM.includes(oldPos.toString()) ) {
						canMove = false;
					}
					//STOP THE PLAYER FROM GETTING PAST BLOCKS IN ANY DIRECTION
					if (levelBoundaryBlocks.includes(newPos.toString())) {
						canMove = false;
					}
					//DETECT LOCKED DOORS AND USE KEYS TO UNLOCK IF AVAILABLE, THIS USES UP A KEY
					if ($('[data-sq="' + newPos + '"]')[0].children.length > 0 && $('[data-sq="' + newPos + '"]')[0].children[0].classList[0] == 'interactable') {
						if ($('.collectedKeys').length > 0) {
							var itemCount = $('.collectedKeys').length;
							//13 ITEMS TOTAL TO COLLECT
							if (itemCount == totalItems) { // AND OPENED DOORS = 8 ^
								//console.log('Create Master Key OR simply enable master door to be unlocked');
								//REMOVE MASTER DOOR IF ALL KEYS GATHER
								$('.Door_master').remove();
							} else {
								//console.log('Not all Keys collected yet');
								for (i=0; i < itemCount; i++) {
									//CHECK FOR MATCHING COLORED KEY THAT HASN'T BEEN USED UP
									if ($('.collectedKeys')[i].attributes[1].value == $('[data-lockNum="' + newPos + '"]').attr('data-doorColor') && $('.collectedKeys')[i].attributes[5].value != 'true') {
										//REMOVE UNLOCKED DOORS WHEN KEYS ARE USED
										$('[data-sq="' + newPos + '"] i').remove();
										//USE UP KEY WHEN DOOR UNLOCKED (SINGLE USE KEYS)
										$('.collectedKeys')[i].attributes[5].value = 'true';
									} else {
										canMove = false;
									}
								}
							}
						} else {
							canMove = false;
						}
					}
					//CHECK IF GAME WINNER
					if ( endPortal.toString() == newPos.toString() ) {
						canMove = false;
						$('#gameBoard').slideDown(function(){
							$('#chickenDinner').removeClass('hidden');
							$('#gameBoard').addClass('hidden');
							setTimeout(function(){
								$('#chickenDinner').html('<i class="fa fa-cog fa-spin"></i>');
								setTimeout(function(){
									$('#chickenDinner').addClass('hidden');
									$('#gameBoard').removeClass('hidden');
									$('#gameBoard div').empty();
									$('#myInventory div').empty();
									createBoard();
									level = Number(localStorage.getItem('CURRENT_LEVEL')) + 1;
									localStorage.setItem('CURRENT_LEVEL', level);
									createGame();
								}, 1500);
							}, 3500);
						});
					}
					
					// ##################################################################################
					// ##################################################################################
					// ##################################################################################
					
					if (canMove == true) {
						//SHOW HELP MESSAGE IF STANDING ON ? ICON
						if ( newPos == helpBlockLoc ) {
							$('#message').text(helpMsg);
						} else {
							$('#message').text('');
						}
						//GATHER KEYS INTO INVENTORY
						if ( $('[data-keyNum="' + newPos + '"]').attr('data-keyNum') != null && $('[data-keyNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
							$('#myInventory div').append($('[data-keyNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
						}
						//GATHER BONES INTO INVENTORY
						if ( $('[data-boneNum="' + newPos + '"]').attr('data-boneNum') != null && $('[data-boneNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
							$('#myInventory div').append($('[data-boneNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
						}
						if (arrow == "LEFT") {
							$('#player').animate({'margin-left': (amount-160) + 'px'}, 150, function(){
								$('#player').remove();
								$('[data-sq="' + newPos + '"]').append('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/player.gif" class="walkLeft" />');
							});
						}
						if (arrow == "RIGHT") {
							$('#player').animate({'margin-right': (amount-160) + 'px'}, 150, function(){
								$('#player').remove();
								$('[data-sq="' + newPos + '"]').append('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/player.gif" class="" />');
							});
						}
						if (arrow == "UP") {
							$('#player').animate({'margin-top': (amount-60) + 'px'}, 100, function(){
								$('#player').remove();
								$('[data-sq="' + newPos + '"]').append('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/player.gif" class="" />');
							});
						}
						if (arrow == "DOWN") {
							$('#player').animate({'margin-bottom': (amount-60) + 'px'}, 100, function(){
								$('#player').remove();
								$('[data-sq="' + newPos + '"]').append('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/player.gif" class="" />');
							});
						}
					} else {
						//console.log( $('[data-sq="' + newPos + '"]')[0].classList[0] );
						if ( $('[data-sq="' + newPos + '"]')[0].classList[0] != 'stopBlock' ) {
							$('[data-sq="' + newPos + '"]').effect('shake', {times:2, distance:3}, 250 );
						}
					}
				}
			}
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			//DETECT ARROW KEYS AND TRIGGER updatePlayerPos() WITH VALUES
			document.onkeydown = function(e) {
				if (canMove == true)  {
					//console.log(e);
					var currentPos = Number($('#player').attr('data-pos'));
					switch(e.which) {
						
						//LEFT ARROW
						case 37:
						updatePlayerPos(currentPos, currentPos-1, 'LEFT');
						break;
						
						//UP ARROW
						case 38:
						updatePlayerPos(currentPos, currentPos-boardSize, 'UP');
						break;
						
						//RIGHT ARROW
						case 39:
						updatePlayerPos(currentPos, currentPos+1, 'RIGHT');
						break;
						
						//DOWN ARROW
						case 40:
						updatePlayerPos(currentPos, currentPos+boardSize, 'DOWN');
						break;
						
						default: return;
					}
					e.preventDefault();
				}
			};
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
			function createGame() {
				
				//CHECK FOR GAME SAVES, IF NONE, START FROM LEVEL 1
				if (localStorage.length != 0) {
					level = localStorage.getItem('CURRENT_LEVEL');
				} else {
					level = 1;
					localStorage.setItem('CURRENT_LEVEL', level);
				}
				
				//LOAD LEVEL SPECIFIC MAPS
				$.getScript('assets/levels/map_' + level + '.js')
					.done(function(script, textStatus) {
						if (textStatus == 'success') {
							console.log('Loading: ' + textStatus);
						} else {
							console.log('Error Loading Map');
						}
					});
				
				
			}
			
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			// ##################################################################################
			
		</script>
		
	</body>
</html>