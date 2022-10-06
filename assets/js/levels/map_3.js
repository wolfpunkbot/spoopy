
if (level == 3) {
	
	console.log('Loading Map ' + level + ' from "map_' + level + '.js"');
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 13; //13
	helpMsg = 'Did you know that you died in a past life?';
	masterDoorNum = 1025;
	endPortal = 925;
	helpBlockLoc = 1275;
	playerTexture = 'default'; //default | jackolantern_head
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = [];
	
	//BONE LOCATIONS [SQ]
	levelBones = [];
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	levelDoors = [];
	
	//LAVA LOCATIONS
	levelLava = [];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = [];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = [];
	
}