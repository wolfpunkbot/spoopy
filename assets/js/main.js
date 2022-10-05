// ##################################################################################
// ##################################################################################
// ##################################################################################

var devDebug = true;
//https://www.youtube.com/watch?v=9RIi9FvDhQA&ab_channel=Thegamerwalkthroughs

// ##################################################################################
// ##################################################################################
// ##################################################################################

//INITIATE MASTER VARIABLES
var totalMaps = 2;
var amount = 0;
var levelDoors, beamBlocks, levelBones, levelLava, levelIce, levelPushBlocks, levelSpotlights = [];
var boardSize = 50;
var totalSquares = 2500;
var canMove = true;
var caughtInBeam = false;
var fellInLava = false;
var userMobile = false;
var level, levelKeys, flip, direction, num, totalItems, helpMsg, endPortal, helpBlockLoc, masterDoorNum, playerTexture, globalMarginTop, globalMarginLeft = '';
const startingSquare = 1225;
const marginLeft = '38px';
const marginTop = '-1025px';

/*
//ALL SIDE NUMBERS OF THE BOARD
var board_TOP = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
var board_LEFT = ['1', '16', '31', '46', '61', '76', '91', '106', '121', '136', '151', '166', '181', '196', '211'];
var board_RIGHT = ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180', '195', '210', '225'];
var board_BOTTOM = ['211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225'];
*/

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

//CHECK IS USER IS ON MOBILE OR DESKTOP ENVIRONMENT
var userMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	userMobile = true;
}

if (userMobile == false) {
	//$('#joyStick').removeClass('hidden');
}

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
	window.location.href = 'http://192.168.1.8/projects/SPOOPY/';
}

//CREATE THE GAME BOARD
function createBoard() {
	$('#gameBoard').empty();
	for (let i = 1; i <= boardSize; i++) {
		$('#gameBoard').append('<div class="flex gameLine" style="justify-content: center;">');
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
		
		// ##################################################################################
		// ##################################################################################
		// ##################################################################################
		
		//STOP THE PLAYER FROM GETTING PAST BLOCKS IN ANY DIRECTION
		if (levelBoundaryBlocks.includes(newPos.toString())) {
			canMove = false;
		}
		//STOP THE PLAYER FROM GETTING PAST BLOCKS IN ANY DIRECTION
		if (levelSpotlights.includes(newPos.toString())) {
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
			clearInterval(triggerBeams);
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
						$('#myBones div').empty();
						createBoard();
						level = Number(localStorage.getItem('CURRENT_LEVEL')) + 1;
						localStorage.setItem('CURRENT_LEVEL', level);
						beamBlocks = [];
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
				$('#message').text(helpMsg).removeClass('hidden');
			} else {
				$('#message').text('').addClass('hidden');
			}
			
			//GATHER KEYS INTO INVENTORY
			if ( $('[data-keyNum="' + newPos + '"]').attr('data-keyNum') != null && $('[data-keyNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
				$('#myKeys div').append($('[data-keyNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
			}
			
			//GATHER BONES INTO INVENTORY
			if ( $('[data-boneNum="' + newPos + '"]').attr('data-boneNum') != null && $('[data-boneNum="' + newPos + '"]').attr('data-isCollected') == 'false' ) {
				$('#myBones div').append($('[data-boneNum="' + newPos + '"]').removeClass('faKey').addClass('collectedKeys').attr('data-isCollected','true').attr('beenUsed','false'));
			}
			
			//devDebug VIEW FIXES
			if (devDebug == true) {
				$('[data-sq="' + newPos + '"]').text('');
				$('[data-sq="' + oldPos + '"]').text(oldPos);
			}
			
			//PUSH BLOCKS
			if ( $('[data-pushBlockNum="' + newPos + '"]').attr('data-pushBlockNum') != null && $('[data-pushBlockNum="' + newPos + '"]').attr('data-inWater') == 'false' ) {
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
					$('[data-sq="' + num + '"]').append('<i class="fas fa-arrows-alt faKey" data-pushBlockNum="' + num + '" data-inWater="false"></i>');
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
				playerInBeam();
			}
			
			//IF PLAYER CAUGHT IN LAVA, SEND PLAYER BACK TO BEGINNNING
			if (fellInLava == true) {
				playerInLava();
			}
			
		} else {
			//STOP PLAYER FROM WALKING INTO CERTAIN OBJECTS.
			//ANIMATE THE BLOCKING OBJECT TO SHAKE
			//console.log( $('[data-sq="' + newPos + '"]')[0].classList );
			if ( $('[data-sq="' + newPos + '"]')[0].classList[0] != 'stopBlock' && $('[data-sq="' + newPos + '"]')[0].classList[0] != 'beamBlock' ) {
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
	//console.log('DROWNED: ' + newPos);
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
	$('#gameBoard').addClass('caughtEffect');
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
		$('#gameBoard').removeClass('caughtEffect');
	}, 1500);
}

// ##################################################################################
// ##################################################################################
// ##################################################################################

//DYNAMICALLY FIGURE OUT WHERE BEAMS SHOULD START AND STOP DEPENDING ON IF THE LIGHTSOURCE IS BLOCKED
//THIS FUNCTION HAS AN INTERVAL SET SO IT WILL REPEAT CONTINUOUSLY
function triggerBeams() {
	//BEAMS TURNED ON IN SEQUENCE
	var time = 500;
	$.each(beamBlocks, function(i, val) {
		setTimeout(() => {
			var stop = false;
			var count = $(this).length;
			for (x = 0; x < count; x++) {
				if (stop == false) {
					if ( !$('[data-sq="' + val[x] + '"]').hasClass('stopBlock') ) {
						//console.log('NO STOPBLOCK DETECTED');
						if (x == 0) {
							$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').addClass('beamStart').attr('hasBeam', 'true');
						} else if (x == count-1) {
							$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').addClass('beamEnd').attr('hasBeam', 'true');
						} else {
							$('[data-sq="' + val[x] + '"]').addClass('beamMiddle').addClass('beamMiddle').attr('hasBeam', 'true');
							if ( $('#player').attr('data-pos') == val[x] ) {
								//DETECT IF STATIONARY PLAYER IS CAUGHT IN BEAM
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
					if ( !$('[data-sq="' + val[x] + '"]').hasClass('stopBlock') ) {
						//console.log('NO STOPBLOCK DETECTED');
						if (x == 0) {
							$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').removeClass('beamStart').attr('hasBeam', 'false');
						} else if (x == count-1) {
							$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').removeClass('beamEnd').attr('hasBeam', 'false');
						} else {
							$('[data-sq="' + val[x] + '"]').removeClass('beamMiddle').removeClass('beamMiddle').attr('hasBeam', 'false');
						}
					}
				}
			}, time);
			time = time + 250;
		});
	}, 500);
}

// ##################################################################################
// ##################################################################################
// ##################################################################################

//PLACE SPOTLIGHT NODES AND THEIR BEAM BLOCKS
function registerBeams() {
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
		url: 'assets/js/levels/map_' + level + '.js',
		type: 'HEAD',
		error: function() {
			//NO MAP FOR THIS LEVEL CREATED YET
			console.log('NO MAP FOR THIS LEVEL CREATED YET');
		},
		success: function() {
			//LOAD LEVEL SPECIFIC MAPS
			$.getScript('assets/js/levels/map_' + level + '.js').done(function(script, textStatus) {
				if (textStatus == 'success') {
					
					//RESET CAMERA POSITION
					$('#gameBoard').css('margin-top', '').css('margin-left', '');
					
					//PLACE DOORS
					$.each(levelBoundaryBlocks, function(i, val) {
						$('[data-sq="' + val + '"]').addClass('stopBlock');
					});
					
					//PLACE KEYS
					$.each(levelKeys, function(i, val) {
						$('[data-sq="' + val.split(':')[1] + '"]').html('<i class="fad fa-key-skeleton faKey Key_' + val.split(':')[0] + '" data-keyColor="' + val.split(':')[0] + '" data-keyNum="' + val.split(':')[1] + '" data-isCollected="false"></i>');
					});
					
					//PLACE BONES
					$.each(levelBones, function(i, val) {
						$('[data-sq="' + val + '"]').html('<i class="fas fa-bone faKey" data-boneNum="' + val + '" data-keyColor="' + val.split(':')[0] + '" data-isCollected="false"></i>');
					});
					
					//PLACE LAVA
					$.each(levelLava, function(i, val) {
						$('[data-sq="' + val + '"]').html('<img src="assets/images/textures/lava.jpg" class="lava faKey" data-lavaNum="' + val + '" />').attr('data-isLava','true').css('outline','none');
					});
					
					//PLACE ICE
					$.each(levelIce, function(i, val) {
						$('[data-sq="' + val + '"]').html('<img src="assets/images/textures/ice.jpg" class="ice faKey" data-iceNum="' + val + '" />');
					});
					
					//PLACE PUSH BLOCKS
					$.each(levelPushBlocks, function(i, val) {
						$('[data-sq="' + val + '"]').html('<i class="fas fa-arrows-alt faKey" data-pushBlockNum="' + val + '" data-inWater="false"></i>');
					});
					
					//PLACE FLASHLIGHTS
					$.each(levelSpotlights, function(i, val) {
						$('[data-sq="' + val + '"]').html('<img src="assets/images/textures/flashlight.png" class="beamSource faKey" data-spotlightNum="' + val + '" data-keyColor="' + val.split(':')[0] + '" data-isOn="false" />').addClass('beamBlock');
					});
					
					//IF MAP CONTAINS BEAMS/FLASHLIGHT DETECTORS
					if (levelSpotlights.length != 0) {
						
						//REGISTER HOW FAR BEAMS CAN GO - THIS NEEDS CLEANED UP
						registerBeams();
						
						//PLACE BEAMS
						setInterval(triggerBeams, 4500);
					}
					
					//SET LOCK ICON FOR ALL DOORS
					var icon = 'fad fa-lock';
					$.each(levelDoors, function(i, val) {
						if (val.split(':')[0] == 'endPortal') {
							icon = 'fas fa-jack-o-lantern';
							$('[data-sq="' + val.split(':')[1] + '"]').html('<img src="assets/images/textures/endPortal.png" class="interactable endPortal Door_' + val.split(':')[0] + '" data-lockNum="' + val.split(':')[1] + '" data-isLocked="true" data-doorColor="' + val.split(':')[0] + '" />');
						} else {
							//SET ICON FOR GHOST DOOR
							if (val.split(':')[0] == 'master') {
								icon = 'fas fa-ghost';
							}
							//SET CODE FOR ALL LOCKED DOORS
							$('[data-sq="' + val.split(':')[1] + '"]').html('<i class="interactable ' + icon + ' Door_' + val.split(':')[0] + '" data-lockNum="' + val.split(':')[1] + '" data-isLocked="true" data-doorColor="' + val.split(':')[0] + '"></i>');
						}
					});
					
					//HELP ICON IN CENTER OF BOARD
					$('[data-sq="' + helpBlockLoc + '"]').append('<i class="fas fa-question-square"></i>');
					
					//SEND PLAYER TO START POSITION
					$('[data-sq="' + startingSquare + '"]').prepend('<img id="player" data-pos="' + startingSquare + '" src="assets/images/characters/' + playerTexture + '.gif" />');
				}
			});
		}
	});
}

// ##################################################################################
// ##################################################################################
// ##################################################################################


