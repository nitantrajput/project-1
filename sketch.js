var dog , dogImg , happyDog , database;
var foodS , foodStock;

function preload(){
	dogImg = loadImage("Dog.png");
	happyDog = loadImage("happydog.png");
}

function setup(){
	createCanvas(500,500);
	database = firebase.database()
	dog = createSprite(250,250,50,50);
	dog.addImage(dogImg);
	dog.scale = 0.3;
	foodStock = database.ref('Food');
	foodStock.on("value",readStock);
}

function draw(){
	background(46,139,87)
	if(foodS!= undefined){
		if(keyWentDown(UP_ARROW)){
			writeStock();
			dogImg.addImage(dogHappy);
		}
	}
	
	drawSprites();
	textSize(20)
	text("milk left"+foodS , 200, 50)
}
function readStock(data){
	foodS = data.val();
}

function writeStock(){
	if(foodS <= 0){
		foodS = 0;
	}
	else{
		foodS = foodS-1
	}
	database.ref('/').update({
		Food:foodS
	})
}