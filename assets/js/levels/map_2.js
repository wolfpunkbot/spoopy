
if (level == 2) {
	
	console.log('Loading Map ' + level + ' from "map_' + level + '.js"');
	
	//SET LEVEL SPECIFIC VARIABLES
	totalItems = 13; //13
	helpMsg = 'Don\'t be a bonehead. Pick up your bones!';
	masterDoorNum = 1;
	endPortal = 1;
	helpBlockLoc = 1275;
	playerTexture = 'jackolantern_head'; //default | jackolantern_head
	
	//SET LEVEL SPECIFIC BLOCKS
	levelBoundaryBlocks = [
		'1377', '677', '663', '1363', 
		'664', '665', '666', '667', '668', '669', '670', '671', 
		'672', '673', '674', '675', '676', '1364', '1365', '1366', 
		'1367', '1368', '1369', '1370', '1371', '1372', '1373', '1374', 
		'1376', '713', '763', '813', '863', '913', '963', '1013', 
		'1063', '1113', '1163', '1213', '1263', '1313', '727', '777', 
		'827', '877', '927', '977', '1027', '1077', '1127', '1177', 
		'1277', '1327', '823', '723', '873', '923', '973', '1023', 
		'1073', '1123', '1173', '1223', '1273', '1323', '1022', '768', '818', 
		'868', '867', '866', '865', '916', '965', '966', '967', '968', 
		'1068', '1168', '1268', '1267', '1215', '1265', '1315', '1167', 
		'1166', '1165', '1116', '1066', '1065', '1067', '1016', '1227', '', 
		//1375
	];
	
	//KEY LOCATIONS [COLOR, SQ]
	levelKeys = ['yellow:1015','yellow:1314','blue:1115','blue:1217','red:915','red:714','green:726','green:917'];
	
	//BONE LOCATIONS [SQ]
	levelBones = ['1324','1326','1072','1017', '1117'];
	
	//DOOR LOCATIONS (COLORED DOOR, GHOST DOOR, AND END PORTAL [COLOR, SQ] AND [master/endPortal, num]
	levelDoors = ['yellow:1064','yellow:1218','blue:1164','blue:1118','red:964','red:1018','green:864','green:718', 'master:' + masterDoorNum, 'endPortal:' + endPortal];
	
	//LAVA LOCATIONS
	levelLava = ['924','925','926','974','975','976',]
	
	//PUSH BLOCK LOCATIONS
	levelPushBlocks = ['1125','1075'];
	
	//SPOTLIGHT LOCATIONS - IN ORDER OF LIGHTING SEQUENCE
	levelSpotlights = ['1272','1271','1270','1269'];
	
}