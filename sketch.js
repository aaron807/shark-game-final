var shark,bigSark
var orangeFish,blueFish
var boat,fastBoat
var net
var ocean
var blueFishGroup
var chance=1
var gameState=1
var speedTime
var orangeFishGroup=[]
var blueFishGroup=[]
var boatGroup,fastBoatGroup
var sharkGroup=[]
var netGroup=[]
var reset
var heart,heart1,heart2
var life=3
var score=0

function preload(){
  oceanImg=loadImage("images/oceanCrop.jpg");
  sharkImg=loadImage("images/shark.png");
  bigSharkImg=loadImage("images/bigShark.png");
  orangeFishImg=loadImage("images/orange fish.png");
  blueFishImg=loadImage("images/blue fish.png");
  boatImg=loadImage("images/boat.png");
  fastBoatImg=loadImage("images/fast boat.png");
  netImg=loadImage("images/net.png");
  gameOverImg=loadImage("images/gamo.jpg");
  resetImg=loadImage("images/reset.png");
  heartImg=loadImage("images/heart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  edges=createEdgeSprites();

  shark = createSprite(200,600,10,10);
  shark.addImage(sharkImg);
  shark.scale=0.4
  shark.setCollider("rectangle",0,0,450,280)

  reset = createSprite(windowWidth-100,100,20,20)
  reset.addImage(resetImg);
  reset.scale=0.2
  reset.visible=false;

  heart=createSprite(50,40,10,10);
  heart.addImage(heartImg);
  heart.scale=0.08
  heart1=createSprite(110,40,10,10);
  heart1.addImage(heartImg);
  heart1.scale=0.08
  heart2=createSprite(170,40,10,10);
  heart2.addImage(heartImg);
  heart2.scale=0.08

  orangeFishGroup=createGroup();
  blueFishGroup=createGroup();
  boatGroup=createGroup();
  fastBoatGroup=createGroup();

}

function draw() {

if(gameState===0){
  background(gameOverImg); 
  reset.visible=true
  textSize(30)
  text("Score: "+score,windowWidth/2-50,100);

  boatGroup.destroyEach();
  for(i=0;i<orangeFishGroup.length;i++){
    orangeFishGroup[i].destroy();
  }
  for(i=0;i<blueFishGroup.length;i++){
    blueFishGroup[i].destroy();
  }
  for(i=0;i<netGroup.length;i++){
    netGroup[i].destroy();
  }
  for(i=0;i<sharkGroup.length;i++){
    sharkGroup[i].destroy();
  }
  shark.visible=false;
  fastBoatGroup.destroyEach();

  if(mousePressedOver(reset)){
  score=0
  gameState=1;
  shark.x=200;
  shark.y=600;
  life=3
  heart.visible=true;
  heart1.visible=true;
  heart2.visible=true
  }
}

if(gameState===1){
  background(oceanImg); 
  textSize(30)
  text("Score: "+score,windowWidth/2-50,100);

  spawnOrangeFish()
  spawnBlueFish()
  spawnBoat()
  spawnShark()
  if(score>19){
    spawnFastBoat()
    }

  reset.visible=false;
  shark.visible=true;

  if(keyDown("W")&&shark.y>350){
    shark.y+=-5
  }
  if(keyDown("S")&&shark.y<750){
    shark.y+=5
  }
  if(keyDown("A")&&shark.x>50){
    shark.x+=-5
  }
  if(keyDown("D")&&shark.x<windowWidth-50){
    shark.x+=5
  }
}
if(gameState===2){
  background(oceanImg); 
  textSize(30)
  text("Score: "+score,windowWidth/2-50,100);

  speedTime=frameCount
  console.log(speedTime)

  spawnOrangeFish()
  spawnBlueFish()
  spawnBoat()
  spawnShark()
  if(score>19){
  spawnFastBoat()
  }
  if(keyDown("W")&&shark.y>350){
    shark.y+=-10
  }
  if(keyDown("S")&&shark.y<750){
    shark.y+=10
  }
  if(keyDown("A")&&shark.x>50){
    shark.x+=-10
  }
  if(keyDown("D")&&shark.x<windowWidth-50){
    shark.x+=10
  }

  if(frameCount===speedTime+300){
    gameState=1
  }
}
for(i=0;i<orangeFishGroup.length;i++){
  if(orangeFishGroup[i].isTouching(shark)){
    orangeFishGroup[i].remove();
    score+=1
  }
}
for(i=0;i<netGroup.length;i++){
  if (netGroup[i].isTouching(shark)){
    netGroup[i].destroy();
    life-=1
    if(life===2){
      heart2.visible=false;
    }
    if(life===1){
      heart1.visible=false;
    }
    if(life===0){
      heart.visible=false;
    }
  }
}
  for(i=0;i<sharkGroup.length;i++){
    if (sharkGroup[i].isTouching(shark)){
      sharkGroup[i].destroy()
      life-=1
      if(life===2){
        heart2.visible=false;
      }
      if(life===1){
        heart1.visible=false;
      }
      if(life===0){
        heart.visible=false;
      }
    }  
}
if(life===0){
  gameState=0
}

for(i=0;i<blueFishGroup.length;i++){
  if(blueFishGroup[i].isTouching(shark)){
    blueFishGroup[i].remove();
    score+=5
    gameState=2 
  }
}



  drawSprites();
} 

function spawnOrangeFish(){
  if(frameCount%120===0){
    orangeFish=createSprite(windowWidth,round(random(350,750)),10,10);
    orangeFish.addImage(orangeFishImg);
    orangeFish.scale=0.1
    orangeFish.velocityX=-3

    orangeFishGroup.push(orangeFish);
   // orangeFishGroup.add(orangeFish);
  }
}

function spawnBlueFish(){
  if(frameCount%240===0){
    chance=round(random(1,2))
    console.log(chance)
    if(chance===1){
    blueFish=createSprite(windowWidth,round(random(350,750)),10,10);
    blueFish.addImage(blueFishImg);
    blueFish.scale=0.2
    blueFish.velocityX=-3

    blueFishGroup.push(blueFish);
    }
  }
}

function spawnShark(){
  if(frameCount%190===0){
    bigShark=createSprite(windowWidth,round(random(350,750)),10,10);
    bigShark.addImage(bigSharkImg);
    bigShark.scale=0.14
    if(score<20){
    bigShark.velocityX=-4.5}
    sharkGroup.push(bigShark);

    if(score>19){
      bigShark.velocityX=-6
    }
   
  }
}

function spawnBoat(){
  for(i=0;i<netGroup.length;i++){
  if(netGroup[i].x<shark.x+100&&netGroup[i].x>shark.x-100){
    netGroup[i].visible=true
    netGroup[i].velocityY=4.5 
    netGroup[i].bounceOff(edges[2]);
    }
  }

  if(frameCount%450==0){
    boat=createSprite(windowWidth,230,10,10);
    boat.addImage(boatImg);
    boat.scale=0.2
    boat.velocityX=-2
    boatGroup.add(boat);
    //console.log(net.x)
    //console.log(shark.x)
    
    net=createSprite(windowWidth,230,50,50);
    netGroup.push(net)
    net.velocityX=-2
    net.addImage(netImg);
    net.scale=0.2 
    net.visible=false
  }
}

function spawnFastBoat(){
  for(i=0;i<netGroup.length;i++){
  if(netGroup[i].x<shark.x+100&&netGroup[i].x>shark.x-100){
    netGroup[i].visible=true
    netGroup[i].velocityY=4.5 
    netGroup[i].bounceOff(edges[2]);
    }
  }

  if(frameCount%270==0){
    fastBoat=createSprite(windowWidth,230,10,10);
    fastBoat.addImage(fastBoatImg);
    fastBoat.scale=0.4
    fastBoat.velocityX=-3.5
    fastBoatGroup.add(fastBoat);
    //console.log(net.x)
    //console.log(shark.x)
    
    net=createSprite(windowWidth,230,50,50);
    netGroup.push(net)
    net.velocityX=-3.5
    net.addImage(netImg);
    net.scale=0.2 
    net.visible=false
  }
}