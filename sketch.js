  var elsa,elsaImage;
  var snowflick,snowflickImage,snowGroup;
  var background,backgroundImage;
  var stone,stoneImage,obstacleGroup;
  var score=0,diamondImage,diamond,scoreGroup;
  var PLAY=1;
  var END=0;
  var gameState=PLAY;
  var gameover,gameoverImage;
  var fire,fireImage,fireGroup;

function preload(){
 // elsaImage=loadImage("snowQueen-unscreen.gif");
  
elsaImage=loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png","girl5.png","girl6.png","girl7.png","girl8.png");
  
 // elsa1Image=loadImage("elsafreez.png");
  backgroundImage=loadImage("gamestage.jpg");
  diamondImage=loadImage("stone1.png");
  snowflickImage=loadImage("snowflick.png");
  stoneImage=loadImage("obstacle.png");
  gameoverImage=loadImage("gameover.png");
  fireImage=loadImage("flame.png");
}

function setup() {
    createCanvas(displayWidth,displayHeight);
  
  obstacleGroup=new Group();
  scoreGroup=new Group();
  flameGroup=new Group();
  snowGroup=new Group();
  
  ground = createSprite(550, 560, 900, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  background=createSprite(580,300,400,450);
  background.addImage(backgroundImage);
  background.scale=1;
  
  
  elsa=createSprite(100,540,10,10);
  elsa.addAnimation("walking",elsaImage);
  elsa.scale=0.6;
 // elsa.debug=true;
  elsa.setCollider("rectangle",10,20,80,280);
  }

 

  function draw() {
   // background(0);
    
    background.velocityX=-1;
    if(background.x<0){ background.x=background.width/2; }
     background.velocityX = -(3 + 2*score/200);
    
    elsa.collide(ground);
    
    if(gameState===PLAY){
      
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
      
    obstacle()
    points()
    flame()
    snow()  
      if(keyDown("up_Arrow")) {
        elsa.velocityY = -16;
    }    
      elsa.velocityY = elsa.velocityY + 0.8;
      
      
    if(scoreGroup.isTouching(elsa)){
     scoreGroup.destroyEach();
      score=score+2;
    }
      
  if(obstacleGroup.isTouching(elsa)){
    gameState = END;
    elsa.velocityY = 0;
   // gameover=createSprite(300,200,20,20);
   // gameover.addImage(gameoverImage);
   // gameover.scale=1;
  }
  
  if(flameGroup.isTouching(elsa)){
    gameState = END;
    elsa.velocityY = 0;
   
  }
      
  if(snowGroup.isTouching(flameGroup)){
    snowGroup.destroyEach();
    flameGroup.destroyEach();
  }
    
     drawSprites();
    stroke("black");
    fill("black");
    textSize(20);
    text("Score:"+  score, 500, 50);

    } 
    
    if(gameState===END){
      gameover=createSprite(300,200,20,20);
      gameover.addImage(gameoverImage);
      gameover.scale=1;
    }
  }   
  
function points(){
  if(frameCount%80===0){
    diamond=createSprite(500,540,10,10);
    diamond.addImage(diamondImage);
    diamond.y = Math.round(random(120,200));
    diamond.scale =0.3;
    diamond.velocityX = -3;
    diamond.lifetime = 200;
   
    scoreGroup.add(diamond);
  }
}

function obstacle() {
  if (frameCount % 250 === 0){
    stone = createSprite(400,540,10,10);
    stone.addImage(stoneImage);
    stone.x = Math.round(random(320,450));
    stone.velocityX = -3;
    stone.lifetime = 200;
    stone.scale = 0.1 ;
    //stone.debug=true;
    stone.setCollider("circle",0,20,200);
     obstacleGroup.add(stone);
  }
}

function flame(){
  if (frameCount % 400 === 0){
    fire = createSprite(480,450,10,10);
    fire.addImage(fireImage);
    fire.velocityX = -4;
    fire.lifetime = 200;
    fire.scale = 0.3 ;
   // fire.debug=true;
    fire.setCollider("circle",0,10,80);
     flameGroup.add(fire);
  }
} 

function snow(){
  if(keyWentDown("space")){
   // elsa.addImage(elsa1Image);
    //elsa.scale=0.4
    snowflick=createSprite(150,450,10,15);
    snowflick.addImage(snowflickImage);
    snowflick.scale=0.1;
    snowflick.velocityX=2;
    snowGroup.add(snowflick);
  }
}
