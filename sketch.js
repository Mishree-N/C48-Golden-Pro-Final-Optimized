//constants
const gameWidth =  800;
const gameHeight =  600;
const mazeColor = "black";
const INTRO=0, START=1, PLAY=2, END=3, WIN=4;
const SQUIRRELMOVE=5;
const MAXLIVES = 3;
const MAXNUTS=35;

//variables
var squirrel, squirrelImg, squirrelFlip;
var snake1, snakeImg, snakeFlip, snake2, snake3, snakeGroup;
var story, gameStory;
var blackScreen, randNum, edges;
var nutImg, gnutImg;
var bgImg;
var nutGroup, gnutGroup, mazeGroup, blockerMazeGroup;
var gameState=INTRO;
var score=0, lives=MAXLIVES;
var collectGnut, collectNuts, snakeBites, loseGame, gameWin;
var soundPlayedOnce = false


function preload(){

  //load squirrel image
  squirrelImg=loadImage("assets/images/Squirrel_left.png");
  squirrelFlip=loadImage("assets/images/Squirrel_right.png");

  //load snake image
  snakeImg=loadImage("assets/images/snake2.png");
  snakeFlip=loadImage("assets/images/snakeFlip.png")

  //load nuts images
  nutImg=loadImage("assets/images/nut.png");
  gnutImg=loadImage("assets/images/gnut.png");

  //load bg image
  bgImg=loadImage("assets/images/bg1.png");

  //load story img
  gameStory=loadImage("assets/images/gameStory7.png");

  //load all sounds
  collectGnut=loadSound("assets/sounds/collectGoldenNut.mp3");
  collectNuts=loadSound("assets/sounds/collectNut.mp3");
  snakeBites=loadSound("assets/sounds/snakeBite.mp3");
  loseGame=loadSound("assets/sounds/loseGame.mp3");
  gameWin=loadSound("assets/sounds/gameWin.mp3");

}


function setup() {
  createCanvas(gameWidth,gameHeight);

  //create group for golden, normal nuts and maze
  nutGroup=new Group();
  gnutGroup=new Group();
  mazeGroup=new Group();
  blockerMazeGroup = new Group ();
  snakeGroup=new Group();

  //call create maze
  createMaze();

  //call create nuts
  createNuts();
  //call create golden nuts
  createGoldenNuts();
      
  //create squirrel sprite and add image
  squirrel=createSprite(753,65,10,10);
  squirrel.addImage("leftImg", squirrelImg);

  //create snakes and add image
  snake1=createSnake(55,575,snakeImg);
  snake2=createSnake(50,55,snakeImg);
  snake3=createSnake(750,575,snakeFlip);

  //create story sprite for background
  story=createSprite(395,300,gameWidth,gameHeight);
  story.addImage(gameStory);
  story.scale=.8;

  //create black screen
  blackScreen=createSprite(gameWidth/2,gameHeight/2,gameWidth,gameHeight);
  blackScreen.shapeColor="black";
  blackScreen.visible=false;

}

function draw() {
  background(bgImg);
  
  //show all sprites
  drawSprites();

  if(gameState!=INTRO){

    //display points and lives
    push();
    textSize (15);
    fill(220,30,5);
    stroke(4);
    text ("POINTS : " + score + "            LIVES : " + lives, 300,15);
    pop();

  }


  if (gameState==INTRO){

    if(keyDown("N")){

      //hide text and story sprite shown in INTRO state
      story.destroy();
  
      //change to start state
      gameState=START;
  
    }
    
  }


  if (gameState==START){

    //show text to press S key to start playing
    fill(220,30,5);
    textSize(15);
    text ("Press the S key to start", 330,50);

    //when s key is pressed,
    if(keyDown("S")){

      //remove barriers 
      blockerMazeGroup.destroyEach ();

      // play game
      gameState=PLAY;

    }

  }


  if(gameState==PLAY){

    edges=createEdgeSprites();

      //if squirrel touches any nut,
      nutGroup.overlap(squirrel, collectNut);
      gnutGroup.overlap(squirrel, collectGoldenNut);

      //if squirrel touches snake,
      snakeGroup.overlap(squirrel, snakeBite);
         
      //call snake movement functions to make snakes move
      snakeMovement(snake1,5,2);
      snakeMovement(snake2,4,2);
      snakeMovement(snake3,5,3);

      //make snakes collide against all walls of the maze and edges 
      snakesCollide();
    
      // squirrel moves with arrow keys      
      squirrelMovement ();
      //make squirrel collide against all walls of the maze and edges 
      squirrelCollide();
    
      

      if (score>=MAXNUTS){
        //change gameState to win
        gameState=WIN;
      }

      if (lives<=0){
        //change gameState to end
        gameState=END; 
      }
      
  }
  

  if (gameState==END){

    //destroy nuts and maze
    nutGroup.destroyEach();
    gnutGroup.destroyEach();
    mazeGroup.destroyEach();

    //make black screen visible
    blackScreen.visible=true;

    //display you lose press r to try again text
    textSize(30);
    fill(220,30,5);
    text("You Lose! Press R to try again.", 200,300);  

    //play end sound only once
    if (soundPlayedOnce == false) {
      loseGame.play();
      soundPlayedOnce = true; 
    }

  }

  //if r key is pressed in end or win state, restart game
  if (keyDown ("R") && (gameState == END || gameState == WIN)){
    restart ();
  }

  if(gameState==WIN){

    //destroy nuts
    nutGroup.destroyEach();
    gnutGroup.destroyEach();
    mazeGroup.destroyEach();

    //make black screen visible
    blackScreen.visible=true;

    //display you win text
    textSize(40);
    fill(220,30,5);
    text("You Win!!!", 320,300);

    //display mini text at bottom that says press r to play again
    textSize(15);
    fill(220,30,5);
    text("Press R to play again", 335, 590);

    //play win sound
    if (soundPlayedOnce == false) {
      gameWin.play();
      soundPlayedOnce = true;
    }

  }

}


function createNuts(){

  //create all 35 nuts
  createNutSprite(590,60);
  createNutSprite(670,115);
  createNutSprite(600,175);
  createNutSprite(750,175);
  createNutSprite(750,175);
  createNutSprite(600,250);
  createNutSprite(600,350);
  createNutSprite(700,400);
  createNutSprite(750,330);
  createNutSprite(670,520);
  createNutSprite(550,570);
  createNutSprite(450,520);
  createNutSprite(380,450);
  createNutSprite(280,500);
  createNutSprite(350,570);
  createNutSprite(180,510);
  createNutSprite(50,490);
  createNutSprite(30,390);
  createNutSprite(180,390);
  createNutSprite(300,350);
  createNutSprite(150,305);
  createNutSprite(670,520);
  createNutSprite(80,120);
  createNutSprite(320,240);
  createNutSprite(400,290);
  createNutSprite(440,180);
  createNutSprite(500,320);
  createNutSprite(520,120);
  createNutSprite(400,90);
  createNutSprite(300,50);
  createNutSprite(230,150);
  createNutSprite(170,60);
  createNutSprite(40,250);
  createNutSprite(90,180);
  createNutSprite(220,260);
  createNutSprite(500,430);
  
}

function createGoldenNuts(){

  //create all 5 golden nuts
  createGnutSprite(730,230);
  createGnutSprite(430,375);
  createGnutSprite(50,320);
  createGnutSprite(510,60);
  createGnutSprite(220,570);

}

function createMaze(){

  //create blocker maze pieces and add to blockerMazeGroup
  createBlockerMazePiece(30,550,170,7);
  createBlockerMazePiece(115,575,7,57);
  createBlockerMazePiece(765,105,110,7);
  createBlockerMazePiece(710,68.5,7,80);
  createBlockerMazePiece(110,53.5,7,60);
  createBlockerMazePiece(25,80,170,7);
  createBlockerMazePiece(700,575,7,70);
  createBlockerMazePiece(750,550,95,7);
  
  //create all 27 maze pieces mazeGroup
  createMazePiece(350,230,7,180);
  createMazePiece(350,140,90,7);
  createMazePiece(290,210,120,7);
  createMazePiece(20,345,350,7);
  createMazePiece(70,345,7,105);
  createMazePiece(250,470,145,7);
  createMazePiece(250,480,7,85);
  createMazePiece(120,175,7,85);
  createMazePiece(90,155,120,7);
  createMazePiece(570,175,7,305);
  createMazePiece(550,100,150,7);
  createMazePiece(460,270,7,160);
  createMazePiece(480,400,230,7);
  createMazePiece(780,200,270,7);
  createMazePiece(700,200,7,105);
  createMazePiece(690,330,50,7);
  createMazePiece(650,550,105,7);
  createMazePiece(700,500,7,105);
  createMazePiece(580,480,60,7);
  createMazePiece(400,565,7,75);
  createMazePiece(240,70,7,50);
  createMazePiece(240,70,50,7);
  createMazePiece(400,24,800,10);
  createMazePiece(400,597,800,10);
  createMazePiece(797,320,10,600);
  createMazePiece(3,320,10,600);
 
}


function flipSnake (sn,mz){
  if (sn.velocityX <0 ) {
    sn.addImage("leftImage", snakeFlip);
    sn.changeImage("leftImage"); 
  } else {
    sn.addImage("rightImage", snakeImg);
    sn.changeImage("rightImage"); 
  }        
}


function snakeMovement (snake, velocityX, velocityY) {
  // flip the snake images when it touches maze walls
  snake.bounceOff (mazeGroup, flipSnake);
  snake.bounceOff(edges, flipSnake);
   
  if (frameCount%200==0){

      //assign random number movements
      randNum=round(random(1,4));
  
      //switch case
      switch (randNum){
  
        //let snake move left
        case 1 : 
          snake.velocityX= (-1) * velocityX; 
          snake.velocityY= velocityY; 
          snake.addImage("leftImage", snakeFlip);
          snake.changeImage("leftImage"); 
          break;
  
        //let snake move right
        case 2 : 
          snake.velocityX=velocityX; 
          snake.velocityY=velocityY; 
          snake.addImage(snakeImg);
          snake.addImage("rightImage", snakeImg);
          snake.changeImage("rightImage"); 
          break;
  
        //let snake move down
        case 3 : 
          snake.velocityY=velocityX; 
          snake.velocityX=velocityY;
          break;
  
        //let snake move up
        case 4 : 
          snake.velocityY=(-1) * velocityX; 
          snake.velocityX=velocityY;
          break;
  
        default : break ;
  
      }
  }

}



//when squirrel touches any normal nut,
function collectNut (nutSprite, squirrel) {

  //destroy nut
  nutGroup.remove (nutSprite);
  nutSprite.destroy ();

  //increment score
  score++;

  //play collect nut sound
  collectNuts.play();

}


//when squirrel touches any golden nut,
function collectGoldenNut (gnutSprite, squirrel) {
  
  //destroy golden nut
  gnutGroup.remove (gnutSprite);
  gnutSprite.destroy ();

  //increment score and lives 
  score++;
  lives++;

  //play collect golden nut sound
  collectGnut.play();

}

//when snake touches/bites squirrel
function snakeBite(sn, sq){

  //if there is a life left,
  if (lives >= 1) {

    //dedcut life 
    lives--; 
    
    //squirrel.setCollider ("circle", 0,0,10);
  }  
  else {
    //else, change gameState to END 
    gameState = END;
  }

  //move squirrel back to beginning position
  squirrel.x=753;
  squirrel.y=65;

  //play snake bite sound
  snakeBites.play();
 
}


function restart(){

  //reset gameState to start
  gameState=START;

  //reset sound played once to false again
  soundPlayedOnce = false;

  //move squirrel back to beginning position
  squirrel.x=753;
  squirrel.y=65;

  //reset lives and score
  lives=MAXLIVES;
  score=0;

  //reset snake's position
  snake1.x=55;
  snake1.y=575;
  snake2.x=50;
  snake2.y=55;
  snake3.x=750;
  snake3.y=575;

  //reset snake velocity to zero
  snake1.velocityX=0;
  snake1.velocityY=0;
  snake2.velocityX=0;
  snake2.velocityY=0;
  snake3.velocityX=0;
  snake3.velocityY=0;

  //make blackScreen invisible again
  blackScreen.visible=false;

  //destroy all nuts and reset them
  nutGroup.destroyEach();
  gnutGroup.destroyEach();

  createNuts();
  createGoldenNuts();

  //destroy whole maze and reset it
  mazeGroup.destroyEach();
  blockerMazeGroup.destroyEach ();
  createMaze();


}

function squirrelMovement () {
  //let squirrel move using arrow key controls
  if(keyDown("UP_ARROW")){
    squirrel.y = squirrel.y-SQUIRRELMOVE;
  }
  if(keyDown("DOWN_ARROW")){
    squirrel.y=squirrel.y+SQUIRRELMOVE;
  }
  if(keyDown("LEFT_ARROW")){
    squirrel.x=squirrel.x-SQUIRRELMOVE;
    squirrel.addImage("LeftImage", squirrelImg);
    squirrel.changeImage("LeftImage"); 
  }
  if(keyDown("RIGHT_ARROW")){
    squirrel.x=squirrel.x+SQUIRRELMOVE;
    squirrel.addImage("RightImage", squirrelFlip); 
    squirrel.changeImage("RightImage");
  }

}

function squirrelCollide(){

  //make squirrel collide against maze and edges 
  squirrel.collide(mazeGroup);
  squirrel.collide(edges);

}


function snakesCollide(){

  //make snakes bounceoff off maze and edges and collide against other snakes
  snakeGroup.bounceOff(mazeGroup);
  snakeGroup.bounceOff(edges);

  snake1.collide(snake2);
  snake1.collide(snake3);
  snake2.collide(snake3);

}
