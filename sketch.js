var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var survivaltime=0;
var score=0;
var button;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  monkeyImg = loadImage("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  overImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  button = createButton('restart');
  button.position(700,50);
  button.style('width', '100px');
  button.style('height', '40px');
  button.style('background', 'lightpink');
  
}

function draw() { 
  background(0);

  button.mousePressed(() => {
    restart();
});

  if(gameState===1){

  survivaltime = survivaltime + Math.round(frameCount/200);

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
   
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnbanana();
    spawnobstacles();

    if(player.isTouching(bananaGroup)){
      bananaGroup[0].destroy();
      score = score +1;
      player.scale +=  + 0.05;
    }

    if (player.isTouching(obstacleGroup)) {
      gameState=0;
    }

   

      if(keyDown("space") ) {
        player.velocityY = -12;
      }

    

  }else if (gameState===0) {
  ground.velocityX = 0;
  player.velocityY = 0;
  backgr.x = 200;

  obstacle.velocityX=0;
  banana.velocityX=0;
  
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  
  var gameover = createSprite(400,200,20,20);
  gameover.addImage(overImg);

  player.changeImage("Running",monkeyImg);
}
  
  drawSprites();

  stroke("blue");
  fill("black");
  textSize(20);
  text("Survival Time: "+ survivaltime,250,50);

  stroke("black");
  fill("white");
  text("Score:"+score,250,80);
  
}

function spawnbanana() {
  
  if (frameCount % 80 === 0) {
  banana = createSprite(500,200,20,20);
  banana.y=Math.round(random(150, 230));
  banana.addImage(bananaImage);
  banana.scale=0.07;
  banana.lifetime=300;
    
  banana.velocityX = -4;
  player.depth = banana.depth + 1;
  bananaGroup.add(banana);
  }
}

function spawnobstacles() {
  
  if (frameCount % 300 === 0) {
  obstacle = createSprite(500,300,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  
  obstacle.velocityX = -(6 + survivaltime/100);
  
  obstacleGroup.add(obstacle);
}

}

function restart(){
  gameState=1;
  score=0;
  survivaltime=0;
}