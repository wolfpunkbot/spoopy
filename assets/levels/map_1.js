
if (level == 1) {
	
	console.log('Loading Map ' + level);
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 13;
	startingSquare = 128;
	helpMsg = 'Did you know that you died in a past life?';
	masterDoorNum = 53;
	endPortal = 23;
	helpBlockLoc = 113;
	playerTexture = 'default'; //default | jackolantern_head
	
	//
	globalMarginTop = '120px'
	//globalMarginLeft = '0px';
	$('#gameBoard').css('margin-top', globalMarginTop);
	//$('#gameBoard').css('margin-left', globalMarginLeft);
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		'47', '48', '49', '51', '52', '37', '22', '188', 
		'24', '39', '54', '55', '57', '58', '59', '119', 
		'79', '94', '109', '124', '139', '169', '203', 
		'168', '167', '171', '172', '87', '102',
		'117', '132', '147', '177', '175', '174',
		'173', '178', '179', '108', '107', '118',
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = ['yellow:77','yellow:89','blue:95','blue:125','red:101','red:131','green:202','green:204'];
	
	//BONE LOCATIONS [SQ]
	levelBones = ['18','28','137','149', '158'];
	
	//ALL BOUNDARY BLOCK LOCATIONS
	boardBoundaryBlocks = $.merge( $.merge($.merge( $.merge( levelBoundaryBlocks, board_TOP ), board_BOTTOM ), board_LEFT), board_RIGHT);
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	interactable = ['yellow:170','yellow:176','blue:64','blue:162','red:72','red:154','green:50','green:56', 'master:' + masterDoorNum, 'endPortal:' + endPortal];
	
	//LAVA LOCATIONS
	levelLava = [];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = [];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = [];
	
}