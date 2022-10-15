/*

-- need to disallow placing of more than one ghost door/master door

*/
//######################################################
//######################################################
//######################################################
	
	$(document).ready(function() {
		
		//ADD CSS CLASSES FOR STYLING
		$('body').append(
			
			'<form id="saveFile">' + 
				'<label for="mapName">Name this Map:</label><br>' + 
				'<input type="text" name="mapName" placeholder="Map Name" maxlength="10" value="" /><br>' + 
				'<button type="button" onclick="saveFile();">Click to save file</button>' + 
			'</form>' + 
			
			'<style>' + 
				
				'#builderContainer { position:absolute; resize:vertical; color:white; background-color:#222; bottom:0; right:0; width:500px!important; height: 600px!important; outline:1px solid #222; }' + 
				'.builder { width:100%; align-items:center; justify-content:center; }' + 
				'.builder div { cursor:pointer; outline: 2px solid #606A62; min-width:75px; min-height:75px; height:75px; width:75px; line-height:75px; }' + 
				
				'.gameBoardBlockSelected { border: 5px solid gold; }' + 
				'.builderSelected { outline: 5px solid gold!important; }' + 
				
				'.buildingBlock img { max-height: 100px; max-width: 100px; height: auto; width: 100%; }' + 
				'#errorMsg { height: 40px; color: #e64c3c; font-size: 1.5em; }' + 
				
			'</style>' + 
			
			'<div class="padding-tb-sm" id="builderContainer">' + 
				'<p class="centered padding-b-md" id="errorMsg"></p>' + 
				'<h1 class="centered padding-tb-md">Map Builder</h1>' + 
				
				'<div class="builder flex padding-tb-sm">' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/deleteBlock.png" class="deleteBlockBuilder" data-blockType="deleteBlock" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/stopBlock.jpg" class="stopBlockBuilder" data-blockType="stopBlock" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/pushBlock.jpg" class="pushBlockBuilder" data-blockType="pushBlock" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/lava.gif" class="lavaBuilder" data-blockType="lava" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/beamSource.jpg" class="beamSourceBuilder" data-blockType="beamSource" />' + 
					'</div>' + 
					
				'</div>' + 
				
				
				'<div class="builder flex padding-tb-sm">' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/ghostDoor.jpg" class="masterDoorBuilder" data-blockType="masterDoor" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/doors/blueDoor.png" class="doorBuilder" data-blockType="blueDoor" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/doors/redDoor.png" class="doorBuilder" data-blockType="redDoor" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/doors/greenDoor.png" class="doorBuilder" data-blockType="greenDoor" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/doors/yellowDoor.png" class="doorBuilder" data-blockType="yellowDoor" />' + 
					'</div>' + 
					
				'</div>' + 
				
				
				'<div class="builder flex padding-tb-sm">' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/pumpkinDoor.jpg" class="endPortalBuilder" data-blockType="endPortal" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/items/blueKey.png" class="keyBuilder" data-blockType="Key_blue" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/items/redKey.png" class="keyBuilder" data-blockType="Key_red" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/items/greenKey.png" class="keyBuilder" data-blockType="Key_green" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/items/yellowKey.png" class="keyBuilder" data-blockType="Key_yellow" />' + 
					'</div>' + 
					
				'</div>' + 
				
			'<div class="builder flex padding-tb-sm">' + 
				
				'<div class="buildingBlock margin-lr-md">' + 
					'<img src="assets/images/textures/items/bone.png" class="boneBuilder" data-blockType="bones" />' + 
				'</div>' + 
				
			'</div>' + 
				
				
			'</div>'
		);
		
	});
	
	//######################################################
	//######################################################
	//######################################################
	
	$(document).ready(function(event) {
		$('.gameContainer').draggable().css('cursor', 'grab');
		$('.gameContainer').mousedown(function() {
			$(this).css('cursor', 'grabbing');
		});
		$('.gameContainer').mouseup(function() {
			$(this).css('cursor', 'grab');
		});
	});
	
	//######################################################
	//######################################################
	//######################################################
	$(document).click(function(event) {
		
		selectBlock(event);
		
	});
	
	//######################################################
	//######################################################
	//######################################################
	
	//PLACE A BLOCK AT TARGET LOCATION
	function placeBlock(event) {
		//console.log(event);
		
		var blockToPlace = $('.builderSelected').attr('data-blockType');
		var sqID = '';
		
		if (event.target.localName == 'i' || event.target.localName == 'img') {
			sqID = $(event.target.offsetParent).attr('data-sq');
		} else {
			sqID = event.target.dataset.sq;
		}
		
		if (blockToPlace == null && event.target.id != 'saveFile') {
			sendErrorMsg('Select a block below first');
		} else if (sqID != 1275 && event.target.id != 'player') {
			//console.log(blockToPlace);
			//console.log(sqID);
			
			//DELETE BLOCK
			if (blockToPlace == 'deleteBlock') {
				//IF DELETING BEAM SOURCE, DELETE THE BEAMS TOO
				if ($('[data-sq="' + sqID + '"]').hasClass('beamBlock')) {
					console.log(levelSpotlights);
					levelSpotlights = [];
					beamBlocks = [];
					clearInterval(myInterval);
				}
			}
			
			//WIPE SQ BLOCK BEFORE PLACING NEW
			$('[data-sq="' + sqID + '"]').empty().removeAttr('class');
			
			//PLACE LAVA BLOCK
			if (blockToPlace == 'lava') {
				$('[data-sq="' + sqID + '"]').html('<img src="assets/images/textures/lava.gif" class="lava faKey" data-lavanum="' + sqID + '">').addClass('sq').attr('data-isLava', 'true').css('outline', 'none');
				//levelLava.push(sqID);
			}
			
			//PLACE STOP BLOCK
			if (blockToPlace == 'stopBlock') {
				$('[data-sq="' + sqID + '"]').addClass(blockToPlace).addClass('sq');
			}
			
			//PLACE BEAM SOURCE
			if (blockToPlace == 'beamSource') {
				$('[data-sq="' + sqID + '"]').html('<img src="assets/images/textures/flashlight.png" class="beamSource faKey" data-spotlightnum="' + sqID + '" data-keycolor="' + sqID + '" data-ison="false">').addClass('beamBlock').addClass('sq');
				levelSpotlights.push(sqID);
				if (levelSpotlights.length != 0) {
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
					triggerBeams();
				}
			}
			
			//PLACE PUSH BLOCK
			if (blockToPlace == 'pushBlock') {
				$('[data-sq="' + sqID + '"]').html('<i class="fas fa-arrows-alt faKey pushBlock" data-pushblocknum="' + sqID + '" data-inwater="false" aria-hidden="true"></i>').addClass('sq');
			}
			
			//PLACE MASTER DOOR
			if (blockToPlace == 'endPortal') {
				$('[data-sq="' + sqID + '"]').html('<img src="assets/images/textures/endPortal.png" class="interactable endPortal Door_endPortal" data-locknum="' + sqID + '" data-islocked="true" data-doorcolor="endPortal">');
			}
			
			//PLACE WOLF DOOR
			if (blockToPlace == 'masterDoor') {
				$('[data-sq="' + sqID + '"]').html('<img src="assets/images/textures/doors/wolf.gif" class="interactable Door_wolf" data-locknum="' + sqID + '" data-islocked="true" data-doorcolor="wolf" />');
			}
			
			//PLACE NORMAL DOORS
			if (blockToPlace.includes('Door') && blockToPlace != 'masterDoor') {
				console.log( blockToPlace );
				$('[data-sq="' + sqID + '"]').html('<img src="assets/images/textures/doors/' + blockToPlace + '.png" class="interactable isADoor Door_' + blockToPlace.split('Door')[0] + '" data-locknum="' + sqID + '" data-islocked="true" data-doorcolor="' + blockToPlace.split('Door')[0] + '" />');
			}
			
			//PLACE KEYS
			if (blockToPlace.includes('Key')) {
				$('[data-sq="' + sqID + '"]').html('<i class="fad fa-key-skeleton faKey ' + blockToPlace + '" data-keycolor="' + blockToPlace.split('_')[1] + '" data-keynum="' + sqID + '" data-iscollected="false" aria-hidden="true"></i>');
			}
			
			//PLACE BONES
			if (blockToPlace == 'bones') {
				$('[data-sq="' + sqID + '"]').html('<i class="fas fa-bone faKey" data-bonenum="' + sqID + '" data-keycolor="' + sqID + '" data-iscollected="false" aria-hidden="true"></i>');
			}
			
		} else {
			sendErrorMsg('Cannot delete, remove or replace this block');
		}
	}
	
	//######################################################
	//######################################################
	//######################################################
	
	function sendErrorMsg(msg) {
		$('#errorMsg').text(msg);
	}
	
	//######################################################
	//######################################################
	//######################################################

	//HANDLES THE BLOCK BUILDER SELECTION
	function selectBlock() {
		if (event.target.offsetParent.id == 'builderContainer') {
			if (event.target.attributes.length >= 2) {
				//console.log(event);
				$('*').removeClass('builderSelected');
				var blockType = event.target.attributes[1].value;
				$(event.target).addClass('builderSelected');
			}
		} else {
			//TRIGGER FUNCTION TO PLACE A BLOCK
			placeBlock(event);
		}
	}
	
	//######################################################
	//######################################################
	//######################################################
	
	//ADD GOLD HIGHLIGHT BORDER TO GAMEBOARD SQUARES
	$(window).mouseenter(function(event) {
		if (event.target.localName != 'i') {
			//console.log(event);
			if (event.target.className.includes('sq')) {
				$(event.target).addClass('gameBoardBlockSelected');
			}
		} else if (event.target.offsetParent.id != 'builderContainer') {
			$(event.target.offsetParent).addClass('gameBoardBlockSelected');
		}
	});
	
	//REMOVE GOLD HIGHLIGHT BORDER FROM GAMEBOARD SQUARES
	$(window).mouseleave(function(event) {
		$('*').removeClass('gameBoardBlockSelected');
	});
	
	//######################################################
	//######################################################
	//######################################################	
	
	function saveFile() {
		if ( $('#saveFile input').val() == '' ) {
			$('#saveFile input').css('background-color', 'red');
			setTimeout(() => { $('#saveFile input').css('background-color', 'white'); }, 2000)
		} else {
			//##########################
			//##########################
			
			//VARIABLES
			var customMapJson = {};
			var levelBoundaryBlocks = [];
			var levelPushBlocks = [];
			var levelSpotlights = [];
			var levelLava = [];
			var totalItems = 0;
			var wolfDoorNum = 0;
			var levelDoors = [];
			var fileName = $('#saveFile input').val();
			
			//##########################
			//##########################
			
			//GET ALL BOUNDARY BLOCKS
			for (i=0; i<$('.stopBlock').length; i++) {
				levelBoundaryBlocks.push( $('.stopBlock')[i].dataset.sq );
			}
			
			//GET ALL PUSH BLOCKS
			for (i=0; i<$('.pushBlock').length; i++) {
				levelPushBlocks.push( $('.pushBlock')[i].dataset.pushblocknum );
			}
			
			//GET ALL SPOT LIGHTS
			for (i=0; i<$('.beamSource').length; i++) {
				levelSpotlights.push( $('.beamSource')[i].dataset.spotlightnum );
			}
			
			//GET ALL LAVA
			for (i=0; i<$('.lava').length; i++) {
				levelLava.push( $('.lava')[i].dataset.lavanum );
			}
			
			//COUNT KEYS AND BONES
			for (i=0; i<$('.fa-key-skeleton').length; i++) {
				totalItems++
			}
			for (i=0; i<$('.fa-bone').length; i++) {
				totalItems++
			}
			
			//GET ALL DOORS
			for (i=0; i<$('.isADoor').length; i++) {
				levelDoors.push( $('.isADoor')[i].dataset.doorcolor + ':' + $('.isADoor')[i].dataset.locknum );
			}
			
			//##########################
			//##########################
			
			//PUSH INTO MASTER ARRAY
			customMapJson["wolfDoorNum"] = wolfDoorNum;
			customMapJson["levelName"] = fileName;
			customMapJson["totalItems"] = totalItems;
			customMapJson["levelBoundaryBlocks"] = levelBoundaryBlocks;
			customMapJson["levelPushBlocks"] = levelPushBlocks;
			customMapJson["levelSpotlights"] = levelSpotlights;
			customMapJson["levelLava"] = levelLava;
			customMapJson["levelDoors"] = levelDoors;
			//
			customMapJson["playerTexture"] = 'default';
			customMapJson["helpMsg"] = 'New Level';
			
			//##########################
			//##########################
			
			customMapJson = JSON.stringify(customMapJson);
			console.log( customMapJson );
			
			$.ajax({
				type: 'POST',
				url: '_saveMap.php?fileName=' + fileName,
				data: {
					data: customMapJson
				},
				dataType:'json',
				error: function(response) {
					console.log(response);
				},
				success: function (response) {
					console.log(response);
					alert('File Saved');
				}
			});
			
			//##########################
			//##########################
		}
	};
	