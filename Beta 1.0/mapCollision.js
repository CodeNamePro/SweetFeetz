var leftCollision, rightCollision, topCollision, bottomCollision = false;
var rowCollided = 0;
var colCollided = 0;
var rightCol = leftCol = false;
function checkCollision()
{
	if(player.onGround == false){
		player.yvel += 3;
	}
	for ( var i = 0; i< (mapArray[level][0].length); i++)
	{
		for ( var j = 0; j< (mapArray[level].length) ; j++)
		{
			
			//EFFECTS PLAYER DEPENDING ON WHAT COLLISION HIT
			if(topCollision){
				if(mapArray[level][rowCollided][colCollided].type == 6){
					changeLevel();
					topCollision = false 
					continue
				}
				player.y = mapArray[level][rowCollided][colCollided].y + 32
				player.yvel = 0.5;
					
				if(mapArray[level][rowCollided][colCollided].type == 7){
					pickup ++;
					mapArray[level][rowCollided][colCollided].type = 0
				}
				topCollision = false
				
				
			}
			if(bottomCollision){
				if(mapArray[level][rowCollided][colCollided].type == 6){
					fadeOut = true;
					fadeIn = false;
					opaq = 0;
					changeLevel();
				}
				//if(!mapArray[level][rowCollided][colCollided].type == 6 && !mapArray[level][rowCollided][colCollided].type == 7){
					player.y = mapArray[level][rowCollided][colCollided].y - player.height
					player.onGround = true;
					if(player.yvel > 0){
						player.yvel = 0;
					}
					inAir = false;
				//}
				if(mapArray[level][rowCollided][colCollided].type == 7){
					lives ++;
					mapArray[level][rowCollided][colCollided].type = 0
				}
				bottomCollision = false;
			}
			else if(!bottomCollision)
			{
				player.onGround = false;
			}
			if(leftCollision){
				if(mapArray[level][rowCollided][colCollided].type == 6){
					fadeOut = true;
					fadeIn = false;
					opaq = 0;
					changeLevel();
				}
					player.x = mapArray[level][rowCollided][colCollided].x + 33;
					map.xvel = 0;
					player.xvel = 0;
				//}
				if(mapArray[level][rowCollided][colCollided].type == 7){
					pickup ++;
					mapArray[level][rowCollided][colCollided].type = 0
				}
				leftCollision = false;
			}
			if(rightCollision){
				console.log(rightCollision);
				if(mapArray[level][rowCollided][colCollided].type == 6){
					fadeOut = true;
					fadeIn = false;
					opaq = 0;
					changeLevel();
					rightCollision = false 
					continue
				}
				//if(!mapArray[level][rowCollided][colCollided].type == 6 && !mapArray[level][rowCollided][colCollided].type == 7){
					player.x = mapArray[level][rowCollided][colCollided].x - player.width - 1;
					player.xvel = 0;
					map.xvel = 0;
			//	}
				if(mapArray[level][rowCollided][colCollided].type == 7){
					pickup ++;
					mapArray[level][rowCollided][colCollided].type = 0
				}
				rightCollision = false;
			}
			//CHECKS COLLISION
			//top
			 if(player.x + 4 < mapArray[level][j][i].x + 32 && player.x + player.width - 4 > mapArray[level][j][i].x){
                if(player.y < mapArray[level][j][i].y + 32 && player.y + 10 > mapArray[level][j][i].y + 12){
					//any block you cant go through 
					if(mapArray[level][j][i].type == 1  || mapArray[level][j][i].type == 6){
						rowCollided = j;
						colCollided = i;
						topCollision = true
						continue
					}
				}
			}
			//bottom
			if(player.x + 4 < mapArray[level][j][i].x + 32 && player.x + player.width - 4 > mapArray[level][j][i].x){
                if((player.y + player.height > mapArray[level][j][i].y) && player.y + player.height - 15 < mapArray[level][j][i].y + 20){
					//any block you cant go through 
					if(mapArray[level][j][i].type == 1 || mapArray[level][j][i].type == 2 || mapArray[level][j][i].type == 6){
						rowCollided = j;
						colCollided = i;
						bottomCollision = true
						continue
					}
					
					
				}
			}
			if(player.y + 4 < mapArray[level][j][i].y + 32 && player.y + player.height - 4 > mapArray[level][j][i].y){
                if(player.x + player.width > mapArray[level][j][i].x && player.x + player.width - 10 < mapArray[level][j][i].x + 20 ){
					//any block you cant go through 
					if(mapArray[level][j][i].type == 1 || mapArray[level][j][i].type == 6 ){
						rowCollided = j;
						colCollided = i;
						rightCollision = true
						return;
					}
				}
			}
			if(player.y + 4 < mapArray[level][j][i].y + 32 && player.y + player.height - 4 > mapArray[level][j][i].y){
                if(player.x + 10 > mapArray[level][j][i].x + 12 && player.x < mapArray[level][j][i].x + 32){
					//any block you cant go through 
					if(mapArray[level][j][i].type == 1 || mapArray[level][j][i].type == 6){
						rowCollided = j;
						colCollided = i;
						leftCollision = true;
						return;
					}
				}
			}
			
			
		}
		
		
	}
	
	if(player.y > mapArray[level][mapArray[level].length -1][0].y){
		death();
	}
}