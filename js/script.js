var canvas,ctx,w,h,game=false,press;
var star,ship,shot,war,shipKill = 0;




var S = false;
var score = 0;
var textGameOver = '';
var img = "img\/", sound = "sound\/",sprite = img+"1.png";

var STAR = function(){
	this.coint  = 500;
	this.sY = .4;
	this.size = h/1000;
	this.color = "#c7e0f0";
	this.c = [];
};
var SHIP = function(x,y){
	this.x = x;
	this.y = y;
	this.w = 73;
	this.h = 111;
	this.img = new Image();
	this.img.src = img+"ship.png";
};

var SHOT = function(x,y){
	this.x = x;
	this.y = y;
	this.img = new Image();
	this.w = 8;
	this.h = 13;
	// this.radius = h/200;
	// this.color = "red";
	this.vy = -8;
	this.shot = [];
	this.img.src = sprite;
	this.posX = 401;
	this.posY = 216;
	this.sound = new Audio(sound + "push.wav");
}

var WAR = function(src,life,w,h,sY,sX) {
	this.life = life;
	this.w = w;
	this.h = h;
	this.sY = sY;
	this.sX = sX;
	this.img = new Image();
	this.img.src = src;
	this.war = [["stone",3],["shipWar",10]];
	this.count = count; // кол-во врагов
	this.cw = []; // двухмерный массив со значениями x,y и life
}
window.onload = init;

		document.addEventListener("mousemove",function(e){
								ship.x = e.offsetX - ship.w/2;
							});
							document.addEventListener("click",function(){
								shot.shot.push([ship.x+ship.w/2-shot.w/2,ship.y]);
								setTimeout(function(){
										shot.shot.shift();
								},5000);
							});
								setTimeout(function(){
										S = true;
								},7000);


function init(){
	game = true;
	score = 0;
	canvas = document.getElementById('canvas');
	canvas.style.background = "black";
	press = document.getElementById('press');
	press.style.display = "none";
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.scrollHeight-4;
	w = canvas.width;
	h = canvas.height;
	ctx = canvas.getContext('2d');
	star = new STAR();
	ship = new SHIP(w/2,h/1.3);
	shot = new SHOT();
	// Вражеские объекты !!!

	
	stone = new WAR(img+"stone.png",5,100,100,2,.5);
	shipWar = new WAR(img+"shipWar.png",1,70,48,0,1);
	// Вражеские Объекты !!!

	for(ST = 0; ST<stone.war[0][1];ST++){
		stone.cw.push([Math.floor(Math.random()*w),-100*ST*4,stone.life]);

	}
	for(WS = 0; WS<shipWar.war[1][1];WS++){
		shipWar.cw.push([(w/4+(shipWar.w+5)*WS),60,shipWar.life]);
	}

	// ЗВЕЗДЫ
	for(k = 0;k<star.coint;k++){
		star.c.push([Math.floor(Math.random()*w),Math.floor(Math.random()*h)]);
	}
	beginGame();
}
	// 							
 	var width = 35.45, 
        height = 35, 
        frames = 26, 
        count = [],
        currentFrame = 0, 
          
        canvas = document.getElementById("canvas"); 
        ctx = canvas.getContext("2d"); 
        image = new Image();
        image.src = 'img/shot.png'; 
      
    var draw = function(posX,posY){ 
        ctx.clearRect(0, 0, width, height); 
        ctx.drawImage(image, width*currentFrame, 0, width-shot.w/2, height-shot.h/2, posX, posY, width-shot.w/2, height-shot.h/2); 
        if (currentFrame == frames) { 
          currentFrame = 0; 
        } else { 
          currentFrame++; 
        } 
    }
      
    
function beginGame(){
	if(game){
	ctx.clearRect(0,0,w,h);
	for(i=0;i<star.coint;i++){
			 if(star.c[i][1] > h){
			 	star.c[i][1] = 0;
			 }
			 ctx.fillStyle = star.color;
			 ctx.beginPath();
			 ctx.arc(star.c[i][0],star.c[i][1],star.size,0,Math.PI*2,true);
			 ctx.closePath();
			 ctx.fill();

												// ctx.drawImage(shot.img,19,122,5,5,star.c[i][0],star.c[i][1],5,5); // Спрайт для звезд
			 //star.c[i][0] += star.sY;
			 star.c[i][1] += star.sY;
		}
			
		// ctx.fillStyle = shot.color;
						for(i = 0; i<stone.war[0][1];i++){
							stone.cw[i][1] += stone.sY;
							stone.cw[i][0] += stone.sX;
							ctx.drawImage(stone.img,stone.cw[i][0],stone.cw[i][1],stone.w,stone.h);
							if(S &&  stone.cw[i][1] > h){
								stone.cw[i][0] = Math.floor(Math.random()*w);
								stone.cw[i][1] = -200;
								stone.sX = -stone.sX;
								stone.cw[i][2] = 5;
							}
							if(stone.cw[i][2] <= 0){
								stone.cw[i][0] = Math.floor(Math.random()*w);
								stone.cw[i][1] = -200;
								 score += 5;
								 stone.cw[i][2] = 5;
							}

							if(stone.cw[i][1] + stone.h - 20 >= ship.y && stone.cw[i][1] <= ship.y + ship.h - 15){
								if(stone.cw[i][0] + stone.w >= ship.x+20 && stone.cw[i][0] <= ship.x + ship.w){
									game = false;
								}
							}
						}

						
			 for(l = 0;l < shot.shot.length ;l++){
				 	//ctx.drawImage(shot.img,shot.shot[l][0],shot.shot[l][1],shot.w,shot.h);
				 	shot.shot[l][1] += shot.vy;
				 	ctx.drawImage(shot.img,shot.posX,shot.posY,shot.w,shot.h,shot.shot[l][0],shot.shot[l][1],shot.w,shot.h);
				 	if(shot.shot[l][1] < 0) {
				 			shot.shot[l][1] = undefined;
				 			shot.shot[l][0] = undefined;
				 	}

				 		for(i = 0; i<shipWar.war[1][1];i++){
							if(shot.shot[l][1] + shot.h <= shipWar.cw[i][1] + shipWar.h && shot.shot[l][1] + shot.h >= shipWar.cw[i][1]) {
					 			if(  shot.shot[l][0] <= shipWar.cw[i][0] + shipWar.w && shot.shot[l][0] >= shipWar.cw[i][0]){
					 			count.push([shot.shot[l][0],shot.shot[l][1]]);
					 			shipWar.cw[i][2]--;
					 			shot.shot[l][1] = undefined;
					 			shot.shot[l][0] = undefined;
					 			score++;
					 			shipKill++;
					 			}
				 			}
						}

				 	for(i = 0; i<stone.war[0][1];i++){
						ctx.drawImage(stone.img,stone.cw[i][0],stone.cw[i][1],stone.w,stone.h);
						if(S &&  stone.cw[i][1] > h){
							stone.cw[i][0] = Math.floor(Math.random()*w);
							stone.cw[i][1] = -200;
							stone.sX = -stone.sX;
							stone.cw[i][2] = 5;
						}
						if(stone.cw[i][2] <= 0){
							stone.cw[i][0] = Math.floor(Math.random()*w);
							stone.cw[i][1] = -200;
							 score += 5;
							 stone.cw[i][2] = 5;
						}

						if(stone.cw[i][1] + stone.h - 20 >= ship.y && stone.cw[i][1] <= ship.y + ship.h - 15){
							if(stone.cw[i][0] + stone.w >= ship.x+20 && stone.cw[i][0] <= ship.x + ship.w){
								game = false;
							}
						stone.cw[i][1] += stone.sY;
						stone.cw[i][0] += stone.sX;
						}


				 	if(shot.shot[l][1] + shot.h <= stone.cw[i][1] + stone.h && shot.shot[l][1] + shot.h >= stone.cw[i][1]) {
				 		if(  shot.shot[l][0] <= stone.cw[i][0] + stone.w && shot.shot[l][0] >= stone.cw[i][0]){
				 			count.push([shot.shot[l][0],shot.shot[l][1]]);
				 			stone.cw[i][2]--;
				 			shot.shot[l][1] = undefined;
				 			shot.shot[l][0] = undefined;
				 			score++;
				 			}
				 		}
				 }
					

			}	
			
			for(i = 0; i<shipWar.war[1][1];i++){
				 		ctx.drawImage(shipWar.img,shipWar.cw[i][0],shipWar.cw[i][1],shipWar.w,shipWar.h);
				 		shipWar.cw[i][0] += shipWar.sX;
				 		if(shipWar.cw[i][0]>=w-shipWar.w || shipWar.cw[i][0]<=0){
				 			shipWar.sX = -shipWar.sX;
				 		}
				 		if(shipWar.cw[i][2] <= 0){
							shipWar.cw[i][1] = undefined;
							shipWar.cw[i][2] = undefined;
						}
			}
			for(l = 0;l < count.length ;l++){
				setInterval(draw(count[l][0],count[l][1]), 100);
				setInterval(function(){
					count.shift();
				}, 100);
				shot.sound.play();
				
			}
			
			
			ctx.fillText("Рекорд: "+score,20,20);
	ctx.drawImage(ship.img,ship.x,ship.y,ship.w,ship.h);


	window.requestAnimationFrame(beginGame);
}
	else {
		ctx.clearRect(0,0,w,h);
		canvas.style.background ="url('img/gameover.jpg') no-repeat";
		canvas.style.backgroundSize = "100% 100%";
		ctx.font = "60px Arial";
		ctx.fillStyle = "#eee";
		textGameOver = "Ваш рекорд";
		ctx.fillText(textGameOver + " " + score,w/2-180,h/2+100);
		press.style.display = "block";
	}
}
function newGame(){
	ctx.clearRect(0,0,w,h);
	press.style.display = "none";
	
	setTimeout(function(){
		init();
	},5000);
}