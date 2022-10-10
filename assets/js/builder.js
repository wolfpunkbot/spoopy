//######################################################
//######################################################
//######################################################
	
	$(document).ready(function() {
		
		//ADD CSS CLASSES FOR STYLING
		$('body').append(
			'<style>' + 
				
				'#builderContainer { position:fixed; color:white; background-color:#222; bottom:0; width:100%; outline:1px solid #222; max-height: 220px; overflow-y: scroll; }' + 
				'.builder { height:100%; width:100%; align-items:center; justify-content:center; }' + 
				'.builder div { cursor:pointer; outline: 2px solid #606A62; min-width:75px; min-height:75px; height:75px; width:75px; line-height:75px; }' + 
				
				'.gameBoardBlockSelected { border: 5px solid gold; }' + 
				'.builderSelected { outline: 5px solid gold!important; }' + 
				
				'.buildingBlock img { max-height: 100px; max-width: 100px; height: auto; width: 100%; }' + 
				'#errorMsg { height: 25px; color: #e64c3c; font-size: 1.5em; }' + 
				
			'</style>' + 
			'<div id="saveFile" onclick="saveFile();">Click to save file</div>' + 
			'<div class="padding-tb-sm" id="builderContainer">' + 
				'<p class="centered padding-b-md" id="errorMsg"></p>' + 
				'<h1 class="centered padding-tb-md">Map Builder</h1>' + 
				
				'<div class="builder flex padding-tb-sm">' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/deleteBlock.jpg" class="deleteBlockBuilder" data-blockType="deleteBlock" />' + 
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
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/ghostDoor.jpg" class="masterDoorBuilder" data-blockType="masterDoor" />' + 
					'</div>' + 
					
					'<div class="buildingBlock margin-lr-md">' + 
						'<img src="assets/images/textures/pumpkinDoor.jpg" class="endPortalBuilder" data-blockType="endPortal" />' + 
					'</div>' + 
					
				'</div>' + 
				
				'<div class="builder flex padding-tb-sm">' + 
					
					//'<div class="buildingBlock margin-lr-md">' + 
					//	'<img src="assets/images/textures/deleteBlock.jpg" class="deleteBlockBuilder" data-blockType="deleteBlock" />' + 
					//'</div>' + 
					
					
					
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
					//REGISTER HOW FAR BEAMS CAN GO - THIS NEEDS CLEANED UP
					registerBeams();
					//PLACE BEAMS
					triggerBeams();
				}
			}
			
			//PLACE PUSH BLOCK
			if (blockToPlace == 'pushBlock') {
				$('[data-sq="' + sqID + '"]').html('<i class="fas fa-arrows-alt faKey pushBlock" data-pushblocknum="' + sqID + '" data-inwater="false" aria-hidden="true"></i>').addClass('sq');
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
		
		//##########################
		//##########################
		
		//VARIABLES
		var customMapJson = [];
		var levelBoundaryBlocks = [];
		var levelPushBlocks = [];
		var levelSpotlights = [];
		var levelLava = [];
		
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
			levelSpotlights.push( $('.lava')[i].dataset.lavanum );
		}
		
		//##########################
		//##########################
		
		//PUSH INTO MASTER ARRAY
		customMapJson["levelBoundaryBlocks"] = levelBoundaryBlocks;
		customMapJson["levelPushBlocks"] = levelPushBlocks;
		customMapJson["levelSpotlights"] = levelSpotlights;
		customMapJson["levelLava"] = levelLava;
		
		//##########################
		//##########################
		
		console.log( customMapJson );
	};
	