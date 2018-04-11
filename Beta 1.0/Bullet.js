const BULLETSPEED = 15;
var bulletArray = [];
var shootLeft = false;
var shootUp = shootDown = false;
bulletArray.shootLeft = false;
bulletArray.shootRight= false;
bulletArray.shootUp = false;
bulletArray.shootDown= false;
function spawnBullet()
{
	if(shootLeft){
		if(shootUp)
		{
			var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootUp: true, shootDown: false};
		}
		else if(shootDown)
		{
			var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootUp: false, shootDown: true};
		}
		else
		{
		var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootUp: false, shootDown: false};
		}
	}
	else if (shootRight)
	{
		if(shootUp)
		{
			var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootUp: true, shootDown: false};
		}
		else if(shootDown)
		{
			var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootDown: true, shootUp: false};
		}
		else
		{
		var bullet = {x:player.x+player.width/1.5, y:player.y+player.height/2,shootLeft:shootLeft, shootUp: false, shootDown: false};
		}
	}
		bulletArray.push(bullet);
	
}

function movebullets()
{
	var i = 0;
	while (bulletArray[i] != undefined)
	{
		console.log(bulletArray[i].shootUp)
		//console.log(canvas.width+5)
		if (bulletArray[i].x < canvas.width+5 && !bulletArray[i].shootLeft)
		{
			
			if(bulletArray[i].shootUp == true)
			{
				bulletArray[i].y -= BULLETSPEED;
			}
			if(bulletArray[i].shootDown == true)
			{
				bulletArray[i].y += BULLETSPEED;
			}
			bulletArray[i++].x += BULLETSPEED;
		}
		
		
		else if (bulletArray[i].x > -5 && bulletArray[i].shootLeft)
		{
			
			if(bulletArray[i].shootUp == true)
			{
				bulletArray[i].y -= BULLETSPEED;
			}
			if(bulletArray[i].shootDown == true)
			{
				bulletArray[i].y += BULLETSPEED;
			}
			bulletArray[i++].x -= BULLETSPEED;
		}
		else{
			bulletArray.splice(i,1);
		}
	}
}
function bulletCollision(){
	
}