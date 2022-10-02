
//LEVEL 2 GAME DATA
if (level == 2) {
	console.log('Loading Map ' + level);
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 1;
	startingSquare = 98;
	helpMsg = 'Did you know that you died in a past life?';
	masterDoorNum = '53';
	endPortal = '23';
	helpBlockLoc = '113';
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		'52', '37', '22', 
		'24', '39', '54', '55', '57', '58', '59',
		'79', '94', '109', '124', '139', '169'
	];
	
	//CREATE BOUNDARIES FOR LEVEL
	boardBoundaryBlocks = $.merge( $.merge($.merge( $.merge( levelBoundaryBlocks, board_TOP ), board_BOTTOM ), board_LEFT), board_RIGHT);
	$.each(boardBoundaryBlocks, function(i, val) {
		$('[data-sq="' + val + '"]').addClass('stopBlock');
	});
	
	//CREATE KEYS
	levelKeys = ['yellow:77','yellow:89','blue:95','blue:125','red:101','red:131','green:202','green:204'];
	$.each(levelKeys, function(i, val) {
		$('[data-sq="' + val.split(':')[1] + '"]').html('<i class="fad fa-key-skeleton faKey Key_' + val.split(':')[0] + '" data-keyColor="' + val.split(':')[0] + '" data-keyNum="' + val.split(':')[1] + '" data-isCollected="false"></i>');
	});
	
	//CREATE BONES
	levelBones = ['18','28','137','149', '158'];
	$.each(levelBones, function(i, val) {
		$('[data-sq="' + val + '"]').html('<i class="fas fa-bone faKey" data-boneNum="' + val + '" data-keyColor="' + val.split(':')[0] + '" data-isCollected="false"></i>');
	});
	
	//CREATE ALL DOORS (INCLUDING FINAL DOOR)
	interactable = ['yellow:170','yellow:176','blue:64','blue:162','red:72','red:154','green:50','green:56', 'master:' + masterDoorNum, 'endPortal:' + endPortal];
	
	//SET LOCK ICON FOR ALL DOORS EXCEPT FINAL DOOR
	var icon = 'fad fa-lock';
	$.each(interactable, function(i, val) {
		if (val.split(':')[0] == 'endPortal') {
			//console.log('endPortal');
			icon = 'fas fa-jack-o-lantern';
			$('[data-sq="' + val.split(':')[1] + '"]').html('<img src="assets/images/textures/endPortal.png" class="interactable endPortal Door_' + val.split(':')[0] + '" data-lockNum="' + val.split(':')[1] + '" data-isLocked="true" data-doorColor="' + val.split(':')[0] + '" />');
		} else {
			//console.log('Other Doors');
			//SET ICON FOR MASTER DOOR AKA FINAL DOOR TO OPEN
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
	$('[data-sq="' + startingSquare + '"]').append('<img id="player" data-pos="' + startingSquare + '" src="assets/images/characters/player.gif" />');
}