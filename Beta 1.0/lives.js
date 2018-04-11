var lives = 5;
function death(){
	lives --;
	if(lives > 0){
		mapArray.x = player.xvel = player.yvel = map.xvel = map.x = 0;
		for ( var j = 0; j< (mapArray[level].length); j++)
		{
			for ( var i = 0; i< (mapArray[level][0].length); i++)
			{
				mapArray[level][j][i].x = i*32;  
				mapArray[level][j][i].y = j*32; 
			}
		}
		player.x = 200;
		player.y = canvas.height-132;
		bar.width = 0;
		bounds();
	}
	else{
		console.log("game over")
	}
}