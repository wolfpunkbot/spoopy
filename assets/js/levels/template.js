
var thisLevel = 0;

if (level == thisLevel) {
	
	console.log('Loading Map ' + level);
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = ;
	startingSquare = ;
	helpMsg = '';
	masterDoorNum = ;
	endPortal = ;
	helpBlockLoc = ;
	playerTexture = 'jackolantern_head';
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = [];
	
	//BONE LOCATIONS
	levelBones = [];
	
	//ALL BOUNDARY BLOCK LOCATIONS
	boardBoundaryBlocks = $.merge( $.merge($.merge( $.merge( levelBoundaryBlocks, board_TOP ), board_BOTTOM ), board_LEFT), board_RIGHT);
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	interactable = [];
	
	//WATER LOCATIONS
	levelLava = [];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = [];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = [];
	
}