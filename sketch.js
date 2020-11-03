//Create variables here
var  dogImg, dog, happyDogImg, happyDog, database, foodS, foodStock;
var FeedTheDog, AddFood, fedTime, lastFed, foodObj;
var gameState, readState;
var bedroomImg, washroomImg, gardenImg;

function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImg=loadImage ("happyDog.png");
  bedroomImg = loadImage ("Images2/Bed Room.png");
  washroomImg = loadImage ("Images2/ Wash Room.png");
  gardenImg = loadImage("Images2/Garden.png");

	//load images here
}

function setup() {
  createCanvas(500,500);

  database= firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  fedTime = database.ref('Food');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  foodObj = new Food();
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  
  
}


function draw() {  
  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
   }
 

drawSprites();
  

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
}