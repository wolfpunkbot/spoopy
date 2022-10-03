
//LEVEL 2 GAME DATA
if (level == 2) {
	
	console.log('Loading Map ' + level);
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 13;
	startingSquare = 178;
	helpMsg = 'Did you know that you died in a past life?';
	masterDoorNum = 204;
	endPortal = 205;
	helpBlockLoc = '193';
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		'206', '191', '176', '161', '146', '131', '116', '101', '86', 
		'71', '56', '26', '183', '185', '155', '156', '79', '115', 
		'153', '154', '125', '126', '124', '123', '95', '94', '93', '109', 
		'64', '63', '36', '51', '65', '66', '96', '186', '168', '139', '198'
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = ['green:29','green:80', 'red:78', 'red:17', 'yellow:197', 'yellow:108', 'blue:138', 'blue:170'];
	
	//BONE LOCATIONS
	levelBones = ['207', '209', '110', '130', '140'];
	
	//ALL BOUNDARY BLOCK LOCATIONS
	boardBoundaryBlocks = $.merge( $.merge($.merge( $.merge( levelBoundaryBlocks, board_TOP ), board_BOTTOM ), board_LEFT), board_RIGHT);
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ]
	interactable = ['yellow:122','yellow:171','blue:141','blue:152','red:111','red:92','green:21','green:62', 'master:' + masterDoorNum, 'endPortal:' + endPortal];
	
	//WATER LOCATIONS
	levelWater = ['87', '88', '89', '102', '103', '104'];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = ['133', '148'];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = ['190', '189', '188', '187'];
	
}