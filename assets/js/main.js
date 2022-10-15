// ##################################################################################
// ##################################################################################
// ##################################################################################

var devDebug = false;
//https://www.youtube.com/watch?v=9RIi9FvDhQA&ab_channel=Thegamerwalkthroughs

// ##################################################################################
// ##################################################################################
// ##################################################################################

//INITIATE MASTER VARIABLES
var totalMaps = 2;
var amount = 0;
var levelDoors, beamBlocks, levelBones, levelLava, levelIce, levelPushBlocks, 
	levelSpotlights = [];
var boardSize = 50;
var totalSquares = 2500;
var canMove = true;
var caughtInBeam = false;
var fellInLava = false;
var userMobile = false;
var level, levelKeys, flip, direction, num, totalDoors, totalBones, 
	totalKeys, helpMsg, endPortal, wolfDoorNum, playerTexture, globalMarginTop, 
	globalMarginLeft, collectedKeyCount, collectedBoneCount, doorsLeft = '';
const startingSquare = 1225;
const marginLeft = '38px';
const marginTop = '-1837px';
var myInterval;

// ##################################################################################
// ##################################################################################
// ##################################################################################

$(document).ready(function() {
	createBoard(); //CREATE BOARD HTML ELEMENTS
	createGame(); //CREATE GAME/LEVEL AND ADD PLAYER
});

// ##################################################################################
// ##################################################################################
// ##################################################################################

//SHOW PERFECT MIDDLE OF SCREEN TO HELP PLACE THE STARTERBLOCK OVER
if (devDebug == true) {
	//console.log('devDebug ON');
	$('body').append('<div class="centered crossHairBlock"></div>');
}

function reset() {
	localStorage.setItem('CURRENT_LEVEL','1');
	window.location.href = '<?php echo $siteURL; ?>';
}

//CREATE THE GAME BOARD
function createBoard() {
	$('#gameBoard').empty();
	for (let i = 1; i <= boardSize; i++) {
		$('#gameBoard').append('<div class="flex gameLine" style="justify-content: center;">');
	}
	$('.gameLine').each(function(index) {
		for (let i = 1; i <= boardSize; i++) {
			$(this).append('<div class="sq"></div>');
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

//DETECT ARROW KEYS AND TRIGGER updatePlayerPos() WITH VALUES
document.onkeydown = function(e) {
	if (canMove == true && caughtInBeam == false && fellInLava == false)  {
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

//UPDATE PLAYER LOCATION
function updatePlayerPos(oldPos, newPos, arrow) {
	if (newPos > 0 && newPos <= totalSquares) { //STOP PLAYER FROM MOVING OUTSIDE THE BOARD
		//console.log(arrow + ': ' + oldPos + ' -> ' + newPos);
		var canMove = true;
		var flip, direction, num = '';
		
		//STOP THE PLAYER FROM GETTING PAST BLOCKS IN ANY DIRECTION
		if ( $('[data-sq="' + newPos + '"]').hasClass('stopBlock') || levelSpotlights.includes(newPos.toString()) ) {
			canMove = false;
		}
		//CHECK IF PLAYER WALKS INTO BEAM
		if ( $('[data-sq="' + newPos + '"]').attr('hasBeam') == 'true' ) {
			caughtInBeam = true;
		}
		//CHECK IF PLAYER WALKS INTO LAVA
		if ( $('[data-sq="' + newPos + '"] img').length != 0 && $('[data-sq="' + newPos + '"]').attr('data-isLava') == 'true' ) {
			fellInLava = true;
		}
		//DETECT LOCKED DOORS AND USE KEYS TO UNLOCK IF AVAILABLE, THIS USES UP A KEY
		if ($('[data-sq="' + newPos + '"]')[0].children.length > 0 && $('[data-sq="' + newPos + '"]')[0].children[0].classList[0] == 'interactable') {
			console.log('trying to open a door..');
			
			//GET PLAYER INVENTORY NUMBERS
			var collectedKeyCount = Number($('#myKeys div i').length);
			var collectedBoneCount = Number($('#myBones div i').length);
			var doorsLeft = Number($('.isADoor').length);
			var tempCount = 0;
			
			//FEED THE WOLF/REMOVE THE WOLF DOOR
			if (newPos == Number(wolfDoorNum)) {
				console.log('attempting to feed puppy');
				if (collectedKeyCount == 0 && doorsLeft == 0 && collectedBoneCount == Number(totalBones)) {
					console.log('removing wolf door..');
					$('.Door_wolf').remove();
					canMove = true;
				} else {
					canMove = false;
				}
			} else {
				canMove = false;
			}
			
			//CHECK KEYS
			if (collectedKeyCount > 0) {
				console.log('has keys..');
				
				//VARIABLES
				var theDoorColorWeAreInteractingWith = $('[data-lockNum="' + newPos + '"]').attr('data-doorColor');
				var theKeyColorWeAreLookingFor = theDoorColorWeAreInteractingWith;
				var myKeyInventoryKey = $('#myKeys div i');
				var myKeyInventoryKeyCount = myKeyInventoryKey.length;
				
				//CHECK INVENTORY
				for (i=0; i<myKeyInventoryKeyCount; i++) {
					if ( Number(totalBones) != collectedBoneCount && doorsLeft != 0 ) {
						console.log('checking collected keys for one matching this door..');
						
						//CHECK FOR MATCHING COLORED KEY THAT HASN'T BEEN USED UP
						var aKeyFromMyInventory = myKeyInventoryKey[i];
						if ( $(aKeyFromMyInventory).attr('data-keyColor') == theKeyColorWeAreLookingFor && tempCount == 0 ) {
							
							//REMOVE COLORED KEY FROM INVENTORY (SINGLE USE KEYS)
							$(aKeyFromMyInventory).remove();
							
							//REMOVE UNLOCKED DOORS WHEN KEYS ARE USED
							$('[data-sq="' + newPos + '"]').empty();
							
							//ALLOW PLAYER MOVEMENT
							canMove = true;
							tempCount = 1;
						} else if (tempCount == 1) {
							canMove = true;
						} else {
							console.log('player does not have the correct key..');
							canMove = false;
						}
					}
				}
			}
		}
		
		//CHECK IF GAME WINNER
		if ( endPortal.toString() == newPos.toString() ) {
			clearInterval(myInterval);
			canMove = false;
			$('#chickenDinner').removeClass('hidden');
			$('#gameBoard').addClass('hidden');
			setTimeout(function(){
				$('#chickenDinner').html('<i class="fa fa-cog fa-spin"></i>');
				setTimeout(function(){
					$('#chickenDinner').addClass('hidden');
					$('#gameBoard').removeClass('hidden');
					$('#gameBoard div').empty();
					$('#myKeys div').empty();
					$('#myBones div').empty();
					createBoard();
					level = Number(localStorage.getItem('CURRENT_LEVEL')) + 1;
					localStorage.setItem('CURRENT_LEVEL', level);
					beamBlocks = [];
					createGame();
				}, 1500);
			}, 3500);
		}
		
		if (canMove == true) {
			console.log('player moving..');
			//SHOW HELP MESSAGE IF STANDING ON ? ICON
			if ( newPos == 1275 ) {
				$('#message').text(helpMsg).removeClass('hidden');
			} else {
				$('#message').text('').addClass('hidden');
			}
			
			//GATHER KEYS INTO INVENTORY
			if ( $('[data-keyNum="' + newPos + '"]').attr('data-keyNum') != null && $('[data-keyNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
				console.log('picking up key..');
				$('#myKeys div').append($('[data-keyNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
			}
			
			//GATHER BONES INTO INVENTORY
			if ( $('[data-boneNum="' + newPos + '"]').attr('data-boneNum') != null && $('[data-boneNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
				console.log('picking up bone..');
				$('#myBones div').append($('[data-boneNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
			}
			
			//devDebug VIEW FIXES
			if (devDebug == true) {
				$('[data-sq="' + newPos + '"]').text('');
				$('[data-sq="' + oldPos + '"]').text(oldPos);
			}
			
			//PUSH BLOCKS
			if ( $('[data-pushBlockNum="' + newPos + '"]').attr('data-pushBlockNum') != null && $('[data-pushBlockNum="' + newPos + '"]').attr('data-inWater') == 'false' ) {
				console.log('trying to push block..');
				var num = 0;
				if (arrow == 'UP') { num = newPos-50; }
				if (arrow == 'DOWN') { num = newPos+50; }
				if (arrow == 'LEFT') { num = newPos-1; }
				if (arrow == 'RIGHT') { num = newPos+1; }
				
				//STOP PLAYER FROM -> PUSHING BLOCK INTO BOUNDARY, PUSHING INTO ANOTHER BLOCK
				if ( $('[data-pushBlockNum="' + num + '"]').attr('data-pushBlockNum') != null && $('[data-pushBlockNum="' + num + '"]').attr('data-inWater') == 'false' || $('[data-sq="' + num + '"]').hasClass('stopBlock') ) {
					//IF TRYING TO MOVE A BLOCK INTO A BLOCK AKA MOVING TWO BLOCKS AT ONCE
					//console.log('CANNOT MOVE 2 BLOCKS AT ONCE');
					canMove = false;
				} else {
					//ALLOW MOVING A SINGLE BLOCK
					//console.log('ALLOW BLOCK MOVEMENT');
					$('[data-sq="' + newPos + '"] i').remove();
					$('[data-sq="' + num + '"]').append('<i class="fas fa-arrows-alt faKey pushBlock" data-pushBlockNum="' + num + '" data-inWater="false"></i>');
					//REMOVE LAVA WHEN BLOCK PUSHED INTO IT
					if ( $('[data-sq="' + num + '"]')[0].children[0].classList[0] == 'lava' ) {
						$('[data-sq="' + num + '"]').attr('isLava', 'false').empty();
					}
				}
			}
			
			//IF LEFT ARROW PRESSED
			if (arrow == "LEFT" && canMove == true) {
				$('#player').remove();
				$('[data-sq="' + newPos + '"]').prepend('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/' + playerTexture + '.gif" class="walkLeft" />');
				//KEEP CAMERA CONTROLS CENTERED
				$('.gameContainer').css('margin-left', Number($('.gameContainer').css('margin-left').split('px')[0]) + 75);
			}
			
			//IF RIGHT ARROW PRESSED
			if (arrow == "RIGHT" && canMove == true) {
				$('#player').remove();
				$('[data-sq="' + newPos + '"]').prepend('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/' + playerTexture + '.gif" class="" />');
				//KEEP CAMERA CONTROLS CENTERED
				$('.gameContainer').css('margin-left', Number($('.gameContainer').css('margin-left').split('px')[0]) - 75);
			}
			
			//IF UP ARROW PRESSED
			if (arrow == "UP" && canMove == true) {
				$('#player').remove();
				$('[data-sq="' + newPos + '"]').prepend('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/' + playerTexture + '.gif" class="" />');
				//KEEP CAMERA CONTROLS CENTERED
				$('.gameContainer').css('margin-top', Number($('.gameContainer').css('margin-top').split('px')[0]) + 75);
			}
			
			//IF DOWN ARROW PRESSED
			if (arrow == "DOWN" && canMove == true) {
				$('#player').remove();
				$('[data-sq="' + newPos + '"]').prepend('<img id="player" data-pos="' + newPos + '" src="assets/images/characters/' + playerTexture + '.gif" class="" />');
				//KEEP CAMERA CONTROLS CENTERED
				$('.gameContainer').css('margin-top', Number($('.gameContainer').css('margin-top').split('px')[0]) - 75);
			}
			
			//IF PLAYER CAUGHT IN THE BEAM, SEND PLAYER BACK TO BEGINNNING
			if (caughtInBeam == true) {
				console.log('caught in beam..');
				playerInBeam();
			}
			
			//IF PLAYER CAUGHT IN LAVA, SEND PLAYER BACK TO BEGINNNING
			if (fellInLava == true) {
				console.log('fell in lava..');
				playerInLava();
			}
			
		} else {
			//STOP PLAYER FROM WALKING INTO CERTAIN OBJECTS.
			//ANIMATE THE BLOCKING OBJECT TO SHAKE
			//console.log( $('[data-sq="' + newPos + '"]')[1].classList );
			if ( !$('[data-sq="' + newPos + '"]').hasClass('stopBlock') && !$('[data-sq="' + newPos + '"]').hasClass('beamBlock') ) {
				console.log('access denied..');
				$('[data-sq="' + newPos + '"]').effect('shake', {times:2, distance:3}, 250 );
			}
		}
	}
}

// ##################################################################################
// ##################################################################################
// ##################################################################################

//RESET PLAYER AFTER FALLING IN LAVA
function playerInLava() {
	canMove = false;
	$('#player').attr('src','assets/images/characters/death.gif');
	setTimeout(() => {
		$('#player').remove();
		$('[data-sq="' + startingSquare + '"]').append('<img id="player" data-pos="' + startingSquare + '" src="assets/images/characters/' + playerTexture + '.gif" class="" />');
		//RESET CAMERA BACK TO STARTER BLOCK
		$('.gameContainer').css('margin-top', marginTop).css('margin-left', marginLeft);
		fellInLava = false;
		canMove = true;
	}, 1500);
}

//RESET PLAYER AFTER BEING CAUGHT IN LIGHT BEAM
function playerInBeam() {
	canMove = false;
	$('.gameContainer').addClass('caughtEffect');
	//PLAY ELECTRIC SHOCK AUDIO WHEN CAUGHT IN BEAM
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', 'assets/audio/beamShockSound.mp3');
	audioElement.setAttribute('id', 'beamShockSound');
	audioElement.play();
	//console.log('GOT CAUGHT BY THE BEAM: ' + newPos);
	$('#player').attr('src','assets/images/characters/caught.gif');
	setTimeout(() => {
		$('#player').remove();
		$('[data-sq="' + startingSquare + '"]').prepend('<img id="player" data-pos="' + startingSquare + '" src="assets/images/characters/' + playerTexture + '.gif" class="" />');
		//RESET CAMERA BACK TO STARTER BLOCK
		$('.gameContainer').css('margin-top', marginTop).css('margin-left', marginLeft);
		caughtInBeam = false;
		canMove = true;
		$('.gameContainer').removeClass('caughtEffect');
	}, 1500);
}

// ##################################################################################
// ##################################################################################
// ##################################################################################

//DYNAMICALLY FIGURE OUT WHERE BEAMS SHOULD START AND STOP DEPENDING ON IF THE LIGHTSOURCE IS BLOCKED
//THIS FUNCTION HAS AN INTERVAL SET SO IT WILL REPEAT CONTINUOUSLY
function triggerBeams() {
	//BEAMS TURNED ON IN SEQUENCE
	if (beamBlocks.length != 0 && beamBlocks.length != null && beamBlocks != '') {
		var time = 500;
		$.each(beamBlocks, function(i, val) {
			setTimeout(() => {
				var stop = false;
				var count = $(this).length;
				for (x = 0; x < count; x++) {
					if (stop == false) {
						if ( !$('[data-sq="' + val[x] + '"]').hasClass('stopBlock') && !$('[data-sq="' + val[x] + '"]').hasClass('pushBlock') ) {
							//console.log('NO STOPBLOCK DETECTED');
							if (x == 0) {
								$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').addClass('beamStart').attr('hasBeam', 'true');
							} else if (x == count-1) {
								$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').addClass('beamEnd').attr('hasBeam', 'true');
							} else {
								$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').attr('hasBeam', 'true');
								//DETECT IF STATIONARY PLAYER IS CAUGHT IN ACTIVE BEAM
								if ($('[data-sq="' + $('#player').attr('data-pos') + '"]').attr('hasBeam') == 'true') {
									playerInBeam();
								}
							}
						} else {
							//BLOCK DETECTED. CANNOT CONTINUE BEAM
							stop = true;
						}
					}
				}
			}, time);
			time = time + 250;
		});
		//BEAMS TURNED OFF IN SEQUENCE
		setTimeout(() => {
			$.each(beamBlocks, function(i, val) {
				setTimeout(() => {
					var count = $(this).length;
					for (x = 0; x < count; x++) {
						if ( !$('[data-sq="' + val[x] + '"]').hasClass('stopBlock') && !$('[data-sq="' + val[x] + '"]').hasClass('pushBlock') ) {
							//console.log('NO STOPBLOCK DETECTED');
							if (x == 0) {
								$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').removeClass('beamStart').attr('hasBeam', 'false');
							} else if (x == count-1) {
								$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').removeClass('beamEnd').attr('hasBeam', 'false');
							} else {
								$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').attr('hasBeam', 'false');
							}
						}
					}
				}, time);
				time = time + 250;
			});
		}, 500);
	}
}

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
	
	//CHECK IF MAP EXISTS
	$.ajax({
		url: 'assets/js/levels/map_' + level + '.json',
		error: function(response) {
			//NO MAP FOR THIS LEVEL CREATED YET
			console.log('NO MAP FOR THIS LEVEL CREATED YET');
		},
		success: function(response) {
			//LOAD LEVEL SPECIFIC MAPS
			console.log(response);
			//RESET CAMERA POSITION
			$('#gameBoard').css('margin-top', '').css('margin-left', '');
			
			//SET GLOBAL VARIABLES
			endPortal = response.endPortal;
			wolfDoorNum = response.wolfDoorNum;
			playerTexture = response.playerTexture;
			totalKeys = response.totalKeys;
			totalBones = response.totalBones;
			totalDoors = response.totalDoors;
			helpMsg = response.helpMsg;
			
			//PLACE BOUNDARY BLOCKS
			$.each(response.levelBoundaryBlocks, function(i, val) {
				$('[data-sq="' + val + '"]').addClass('stopBlock');
			});
			
			//PLACE END PORTAL
			$('[data-sq="' + response.endPortal + '"]').html('<img src="assets/images/textures/endPortal.png" class="interactable endPortal Door_endPortal" data-locknum="' + response.endPortal + '" data-islocked="true" data-doorcolor="endPortal">');
			
			//PLACE WOLF DOOR
			$('[data-sq="' + response.wolfDoorNum + '"]').html('<img src="assets/images/textures/doors/wolf.gif" class="interactable Door_wolf" data-locknum="' + response.wolfDoorNum + '" data-islocked="true" data-doorcolor="wolf" />');
			
			//PLACE KEYS
			if (response.levelKeys != null) {
				for (i=0; i<response.levelKeys.length; i++ ) {
					var keyColor = response.levelKeys[i].split(':')[0];
					var keyNum = response.levelKeys[i].split(':')[1]
					$('[data-sq="' + keyNum + '"]').html('<i class="fad fa-key-skeleton faKey Key_' + keyColor + '" data-keyColor="' + keyColor + '" data-keyNum="' + keyNum + '" data-isCollected="false"></i>');
				}
			}
			
			//PLACE BONES
			$.each(response.levelBones, function(i, val) {
				$('[data-sq="' + val + '"]').html('<i class="fas fa-bone faKey" data-boneNum="' + val + '" data-keyColor="' + val.split(':')[0] + '" data-isCollected="false"></i>');
			});
			
			//PLACE LAVA
			$.each(response.levelLava, function(i, val) {
				$('[data-sq="' + val + '"]').html('<img src="assets/images/textures/lava.gif" class="lava faKey" data-lavaNum="' + val + '" />').attr('data-isLava','true').css('outline','none');
			});
			
			//PLACE PUSH BLOCKS
			$.each(response.levelPushBlocks, function(i, val) {
				$('[data-sq="' + val + '"]').html('<i class="fas fa-arrows-alt faKey pushBlock" data-pushBlockNum="' + val + '" data-inWater="false"></i>');
			});
			
			//PLACE FLASHLIGHTS
			$.each(response.levelSpotlights, function(i, val) {
				$('[data-sq="' + val + '"]').html('<img src="assets/images/textures/flashlight.png" class="beamSource faKey" data-spotlightNum="' + val + '" data-keyColor="' + val.split(':')[0] + '" data-isOn="false" />').addClass('beamBlock');
			});
			
			//IF MAP CONTAINS BEAMS/FLASHLIGHT DETECTORS
			if (response.levelSpotlights.length != 0 && response.levelSpotlights != '') {
				//PUSH LIGHTBLOCK SOURCES TO LOCAL ARRAY
				for (i=0; i<response.levelSpotlights.length; i++ ) {
					levelSpotlights.push(response.levelSpotlights[i]);
				}
				//REGISTER BEAMS - HOW FAR BEAMS CAN GO - THIS NEEDS CLEANED UP
				if (levelSpotlights.length != 0) {
					var count = levelSpotlights.length;
					beamBlocks = [];
					for (i = 0; i < count; i++) {
						beamBlocks.push([
							Number(levelSpotlights[i]) - 50,
							Number(levelSpotlights[i]) - 100,
							Number(levelSpotlights[i]) - 150,
							Number(levelSpotlights[i]) - 200,
							Number(levelSpotlights[i]) - 250,
							Number(levelSpotlights[i]) - 300,
							Number(levelSpotlights[i]) - 350,
							Number(levelSpotlights[i]) - 400,
							Number(levelSpotlights[i]) - 450,
							Number(levelSpotlights[i]) - 500,
							Number(levelSpotlights[i]) - 550
						]);
					}
				}
				//PLACE BEAMS
				myInterval = setInterval(triggerBeams, 4500);
			}
			
			//SET LOCK ICON FOR ALL DOORS
			
			$.each(response.levelDoors, function(i, val) {
				if (val.split(':')[0] == 'endPortal') {
					$('[data-sq="' + val.split(':')[1] + '"]').html('<img src="assets/images/textures/endPortal.png" class="interactable endPortal Door_' + val.split(':')[0] + '" data-lockNum="' + val.split(':')[1] + '" data-isLocked="true" data-doorColor="' + val.split(':')[0] + '" />');
				} else {
					//SET CODE FOR ALL LOCKED DOORS
					$('[data-sq="' + val.split(':')[1] + '"]').html('<img src="assets/images/textures/doors/' + val.split(':')[0] + 'Door.png" class="interactable isADoor Door_' + val.split(':')[0] + '" data-locknum="' + val.split(':')[1] + '" data-islocked="true" data-doorcolor="' + val.split(':')[0] + '" />');
				}
			});
			
			
			//HELP ICON IN CENTER OF BOARD
			$('[data-sq="1275"]').append('<i class="fas fa-question-square"></i>');
			
			//SEND PLAYER TO START POSITION
			$('[data-sq="' + startingSquare + '"]').prepend('<img id="player" data-pos="' + startingSquare + '" src="assets/images/characters/' + response.playerTexture + '.gif" />');
			
			//
			$('.gameContainer').css('margin-left', marginLeft).css('margin-top', marginTop);
		}
	});
}

// ##################################################################################
// ##################################################################################
// ##################################################################################


