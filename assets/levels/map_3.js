
if (level == 3) {
	
	console.log('Loading Map ' + level);
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = '';
	startingSquare = 113;
	helpMsg = '';
	masterDoorNum = '';
	endPortal = '';
	helpBlockLoc = '';
	playerTexture = 'jackolantern_head'; //default | jackolantern_head
	
	//
	globalMarginTop = '200px'
	globalMarginLeft = '0px';
	$('#gameBoard').css('margin-top', globalMarginTop);
	$('#gameBoard').css('margin-left', globalMarginLeft);
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = [];
	
	//BONE LOCATIONS [SQ]
	levelBones = [];
	
	//ALL BOUNDARY BLOCK LOCATIONS
	boardBoundaryBlocks = $.merge( $.merge($.merge( $.merge( levelBoundaryBlocks, board_TOP ), board_BOTTOM ), board_LEFT), board_RIGHT);
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	interactable = [];
	
	//LAVA LOCATIONS
	levelLava = [];
	
	//ICE LOCATIONS
	levelIce = ['113', '98', '68'];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = [];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = [];
	
}