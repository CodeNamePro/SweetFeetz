/*
* To Do:
*- splash screen in and out
*- fix fade in and out functions
*
*/
var canvas = document.querySelector("canvas"); //Create canvas 
canvas.width = 1000; //set canvas width
canvas.height = 640; // set canvas height
var surface = canvas.getContext("2d");

//map object holds map velocity, image and more
var map = {img:null, x:0, y:0, width:2000, height:canvas.height, xvel:0, yvel:0, oldX: 0, oldY: 0};
//var map = {img:null, x:0, y:mapArray[level][mapArray[level].length][0].y, width:(mapArray[level][0].length * 32), height:(mapArray[level].length * 32), xvel:0, yvel:0, oldX: 0, oldY: 0};

//Player
var player = {img:null, x:200, y:canvas.height-132, jumping:false, xvel:0, yvel:0, onGround: false, width:64, height:64, oldX:0, oldY:0};
//Players Bar
var bar ={img:null, x:150, y:canvas.height-50, width:0, height:20};
//Bars HUD
var barHUD = {img:null, x:bar.x-2, y:bar.y-2, width:745, height:24};
//Objects for Bullets created here so you can call the picture
var bullet ={img:null};
//start inverval and update interval
var uInt;
//start uInt timer for title screen
uInt = setInterval(update, 33.34);

//screen state (0 = title, 1 = startscreen, 2 = game);
var screenState = 0;
//buttons and title objects for title screen
var title = {img:null, x:200, y:50, width:585, height:201};
var startButton = {img:null, x:400, y:300, width: 200, height:50};
var levelButton = {img:null, x:400, y:400, width: 200, height:50};
var quitButton = {img:null, x:400, y:500, width: 200, height:50};
var splash = {img:null, x: 0, y: 0 , width: canvas.width, height: canvas.height, ctr: 0, time: 150};
//button Counter - holds position of what button is selected
var bCtr = 0; 
//Paused boolean
var paused = false;

// VARIABLES DECLARE HERE IN ONE SPOT
//Movement variables
var leftPressed = rightPressed = upPressed = spacePressed = downPressed = enterPressed = false;
var aPressed = wPressed = sPressed = dPressed = false;
//Fading variables
var opaq = 1;
var fadeIn = fadeOut = false;
//map level
var level = 0;
//Players current sprite
var playerSprite = 0; 
//counts frames until next animation
var spriteCtr = 0;
// holds direction player is facing
var LorR = 0;
//last left sprite (left sprites are from 8-5)
var leftSprite = 5;
//last sprite for right direction (right sprites are 0-4)
var rightSprite = 4;
//frames that have to pass to change animation
var framesPerSprite = 4;





/*Initialize images
* map = 0, player = 1, bar = 2,
* barHud = 3, startButton = 4, 
*startButtonH = 5 (highlighted) levelButton = 6,
* levelButtonH = 7 (highlighted) title = 8 
* splashScreen = 9 bullet = 10 tiles = 11
* quitButton = 12, quitButtonH = 13
*/
var images = [];
var imgStr = ["map", "player","bar", "barHUD","startButton", "startButtonH", "levelButton", "levelButtonH", "title","splashScreen","bullet", "tiles", "quitButton", "quitButtonH"];
for(var v = 0; v < imgStr.length; v++){
	images[v] = new Image();
	images[v].src = imgStr[v] + ".png";
}
map.img = images[0];
player.img = images[1];
bar.img = images[2];
barHUD.img = images[3];
startButton.img = images[4];
levelButton.img = images[6];
quitButton.img = images[12]
title.img = images[8];
splash.img = images[9];
bullet.img = images[10];

function update(){
	//splashScreen
	if(screenState == 0){
		splashScreen();
	}
	//Title Screen
	else if (screenState == 1){
		startGame();
	}
	//Game Screen
	else if (screenState == 2){
		
		movePlayer();
		animatePlayer();
		bounds();
		checkCollision();
		fillMeter();
		movebullets();
	}
	Fadein();
	Fadeout();
	render();
}

function splashScreen(){
	if(splash.ctr >= splash.time){
		screenState = 1;
	}
	if(splash.ctr >= (splash.time - 50)){
		fadeOut = true;
	}
	splash.ctr ++;
}

function startGame(){	
	fadeIn = true;
	fadeOut = false;
	//goes down button if down pressed also stops if at last button
	if((downPressed || sPressed)&& bCtr < 2){
		//makes sure not to skip button
		downPressed = false;
		sPressed = false;
		bCtr ++;
	}
	//goes up button if up pressed also stops if at first button
	if((upPressed || wPressed) && bCtr > 0){
		//makes sure not to skip button
		upPressed = false;
		wPressed = false;
		bCtr --;
	}
	switch (bCtr >= 0)
	{
		case(bCtr == 0):
			startButton.img = images[5];
			levelButton.img = images[6];
			if(enterPressed){
				enterPressed = false;
				startHit();
			}
			break;
		case(bCtr == 1):
			startButton.img = images[4];
			levelButton.img = images[7];
			quitButton.img = images [12];
			break;
		case(bCtr == 2):
			quitButton.img = images[13];
			levelButton.img = images[6];
			if(enterPressed){
				window.close();
			}
			break;
	}
	
}

function Fadeout(){
	if(fadeOut == true){
		if(opaq>=0){
			surface.globalAlpha = opaq;
			opaq -= 0.02;
		}
	}
}
function Fadein(){
	if(fadeIn == true){
		if (opaq <= 1){
			surface.globalAlpha = opaq;
			opaq += 0.02;
		}
	}
}
function render(){
	//Splash Screen
	if(screenState == 0){
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(splash.img, splash.x, splash.y, splash.width, splash.height);
	}
	//Start Menu
	if(screenState == 1){
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(startButton.img, startButton.x, startButton.y, startButton.width, startButton.height);
		surface.drawImage(levelButton.img, levelButton.x, levelButton.y, levelButton.width, levelButton.height);
		surface.drawImage(quitButton.img, quitButton.x, quitButton.y, quitButton.width, quitButton.height);
		surface.drawImage(title.img, title.x, title.y, title.width, title.height);
	}
	//Game state
	if(screenState == 2){
		surface.clearRect(0,0,canvas.width,canvas.height);
		for ( var i = 0; i < (mapArray[level][0].length); i++){
			for ( var j = 0; j < (mapArray[level].length); j++){
				surface.drawImage(mapArray[level][j][i].img, 32*mapArray[level][j][i].type, 0,32 ,32,mapArray[level][j][i].x, mapArray[level][j][i].y, 34,32);
			}
		}
		surface.drawImage(bar.img, bar.x, bar.y, bar.width, bar.height);
		surface.drawImage(barHUD.img, barHUD.x, barHUD.y, barHUD.width, barHUD.height);
		surface.drawImage(player.img,64*playerSprite, 0, 64, 64,player.x, player.y, 64, 64);
		//lives
		surface.font = "20px Georgia";
		surface.fillText("Lives: " + lives.toString(), 850, 50);
		for (var i = 0; i < bulletArray.length; i++)
		{
			surface.drawImage(bullet.img, bulletArray[i].x, bulletArray[i].y, 8, 4);
		}
	}
}
function startHit(){
	screenState = 2;
	map.width = (mapArray[level][0].length * 32);
	map.height = (mapArray[level].length * 32);
	
	for(var q = 0; q < 2; q++){
		
		for ( var j = 0; j< (mapArray[level].length); j++)
		{
			for ( var i = 0; i< (mapArray[level][0].length); i++)
			{
			
				var tile = {}; 	
				tile.img = images[11]
				tile.x = i*32;  
				tile.y = j*32 - ((mapArray[level].length - 20)*32); 
				switch(tile.x == i*32){
					case (mapArray[q][j][i] == 0):
						//AIR
						tile.type = 0;
						break;
					case(mapArray[q][j][i] == 1):
						//PLATFORM
						tile.type = 1;
						break;
					case(mapArray[q][j][i] == 2):
						//JUMP THROUGH BOT
						tile.type = 2;
						break;
					case(mapArray[q][j][i] == 3):
						//BREAKABLE BLOCK
						tile.type = 3;
						break;
					case(mapArray[q][j][i] == 4):
						//BUTTON BLOCK
						tile.type = 4;
						break;
					case(mapArray[q][j][i] == 5):
						//LEVEL UP
						tile.type = 5;
						break;
					case(mapArray[q][j][i] == 6):
						//NEXT LEVEL
						tile.type = 6;
						break;
				}	
				mapArray[q][j][i] = tile; 
				
			}
		}
	}
	//var map = {img:null, x:0, y:mapArray[level][mapArray[level].length][0].y, width:(mapArray[level][0].length * 32), height:(mapArray[level].length * 32), xvel:0, yvel:0, oldX: 0, oldY: 0};
}
function movePlayer(){
	if(player.yvel == 3){
		player.onGround = true;
	}
	//move player right 
	if(dPressed){
		if(boundR <= canvas.width && player.x + player.width <= canvas.width){
			if(map.xvel < 0){
				player.xvel = -map.xvel;
			}
			player.xvel += 1.5;
			map.xvel = 0;
		}
		else if(boundL >= -32 && player.x >=0 && player.x <= canvas.width/2){
			if(map.xvel < 0){
				player.xvel = -map.xvel;
			}
			player.xvel += 1.5;
			map.xvel = 0;
		}
		else if(player.x + player.width <= canvas.width){
			if(player.xvel > 0){
				map.xvel = -player.xvel;
			}
			map.xvel -= 1.5;
			player.xvel = 0;
		}
		else{
			map.xvel = 0;
			player.xvel = 0;
		}
	}
	//move player left
	if(aPressed){
		if(boundR <= canvas.width && player.x >= canvas.width/2){
			if(map.xvel > 0){
				player.xvel = -map.xvel;
			}
			player.xvel -= 1.5;
			map.xvel = 0;
		}
		else if(boundL >= 0 && player.x >=0){
			if(map.xvel > 0){
				player.xvel = -map.xvel;
			}
			player.xvel -= 1.5;
			map.xvel = 0;
		
		}
		else if(player.x >= 0){
			if(player.xvel < 0){
				map.xvel = -player.xvel;
			}
				map.xvel += 1.5;
				player.xvel = 0;
		}
		else{
			map.xvel = 0;
			player.xvel = 0;
		}

	}
	//jump 
	if(spacePressed && player.onGround){
		player.yvel -= 35;
		player.onGround = false;
	}
	
	//movement physics
	for ( var i = 0; i< (mapArray[level][0].length); i++)
	{
		for ( var j = 0; j< (mapArray[level].length); j++)
		{
			mapArray[level][j][i].x += map.xvel
			mapArray[level][j][i].y += map.yvel
		}
	}
	player.y += player.yvel;
	player.x += player.xvel;
	player.yvel *= 0.9;
	player.xvel *= 0.9;
	map.xvel *= 0.9;
}
function animatePlayer()
{
	//Faces direction last pressed
	if(playerSprite != 0 && LorR == 2 && !dPressed)
		playerSprite = 0;
	if(playerSprite != 7 && LorR == 1 && !aPressed)
		playerSprite = 7
	//Animation
	if((aPressed || dPressed) && player.x > 0){
		spriteCtr++;
		//Right animation
		if(spriteCtr == framesPerSprite && dPressed){
			LorR = 2;
			spriteCtr = 0;
			playerSprite++;
			if (playerSprite >= rightSprite)
				playerSprite = 0;
		}
		//Left animation
		if(spriteCtr == framesPerSprite && aPressed){
			LorR = 1;
			spriteCtr = 0;
			playerSprite--;
			if (playerSprite <= leftSprite)
				playerSprite = 7;
		}
	}
}
//check if keys are pressed or released
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
//Function for pressing key down
function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 37: //left arrow
			leftPressed = true;
			if(bar.width > 25){
				shootLeft = true;
				bar.width -= 25
				spawnBullet();
			}
			break;
		case 39: //right arrow
			rightPressed = true;
			if(bar.width > 25){
				shootRight = true;
				bar.width -= 25
				spawnBullet();
			}
			break;
		case 38: //up arrow
			if (upPressed == false)
            {
            upPressed = true;
			shootUp = true;
            }
            break
		case 40://down arrow
			downPressed = true;
			shootDown = true;
			break;
		case 32: //spacebar
			spacePressed = true;
			break;
		case 13: // enter
			enterPressed = true; 
			break; 
		case 65://a
			aPressed = true;
			break;
		case 68:// d
			dPressed = true;
			break;
		case 87://w
			wPressed = true;
			break;
		case 83://s
			sPressed = true;
			break;
		
	} 
}
//function for releasing key
function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 37: //left arrow
			leftPressed = false;
			shootLeft = false;
			break;
		case 39: //right arrow
			rightPressed = false;
			shootRight = false;
			break;
		case 38:// up arrow
			upPressed = false;
			shootUp = false;
			break;
		case 32: //spacebar
			spacePressed = false;
			break;
		case 40: //down arrow
			downPressed = false;
			shootDown = false;;
			break;
		case 13: //enter
			enterPressed = false;
			break;
		case 65://a
			aPressed = false;
			break;
		case 68:// d
			dPressed = false;
			rightCol = false;
			break;
		case 87://w
			wPressed = false;
			break;
		case 83://s
			sPressed = false;
			break;
	}
}