
if (level == 1) {
	
	console.log('Loading Map ' + level + ' from "map_' + level + '.js"');
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 13; //13
	helpMsg = 'Did you know that you died in a past life?';
	masterDoorNum = 1025;
	endPortal = 925;
	helpBlockLoc = 1275;
	playerTexture = 'default'; //default | jackolantern_head
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		'1024', '974', '924', '874', '875', '876', '926', '976', 
		'1026', '1027', '1023', '1029', '1030', '1031', '1021', 
		'868', '869', '870', '871', '872', '873', '877', '878', 
		'879', '880', '881', '882', '932', '982', '1032', '1082', 
		'1132', '1182', '1232', '1282', '1332', '1382', '1432', 
		'1482', '1532', '1582', '918', '968', '968', '1018', '1068', 
		'1118', '1168', '1218', '1268', '1318', '1368', '1418', '1468', 
		'1020', '1019', '1221', '1171', '1121', '1220', '1271',  
		'1321', '1420', '1419', '1518', '1568', '1219',  '1576',
		'1569', '1570', '1571', '1572', '1573', '1574', '1575',   
		'1577', '1578', '1579', '1580', '1581', '1475', '1525', 
		'1421', '1424', '1423', '1425', '1426', '1427', '1429',  
		'1229', '1230', '1231', '1129', '1179', '1279', '1329', 
		'1430', '1431'
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = ['yellow:1131','yellow:1119','blue:1172','blue:1272','red:1178','red:1278','green:1524','green:1526'];
	
	//BONE LOCATIONS [SQ]
	levelBones = ['1375','1319','1331','920', '930'];
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	levelDoors = ['yellow:1428','yellow:1422','blue:1071','blue:1379','red:1079','red:1371','green:1028','green:1022', 'master:' + masterDoorNum, 'endPortal:' + endPortal];
	
	//LAVA LOCATIONS
	levelLava = [];
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = [];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = [];
	
}