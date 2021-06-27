// create nut sprite and add to nutGroup
function createNutSprite(x,y) {
  var nut =createSprite(x,y,10,10);
  nut.addImage(nutImg);
  nut.scale=0.06;
  nutGroup.add (nut);
}

// create golden nut sprite and add to gnutGroup 
function createGnutSprite(x,y) {
  var gnut = createSprite(x,y,10,10);
  gnut.addImage(gnutImg);
  gnut.scale=0.023;
  gnutGroup.add (gnut);
}

//create maze Piece
function createMazePiece(x,y,w,h) {
  var mazeSprite = createSprite(x,y,w,h);
  mazeSprite.shapeColor=mazeColor;
  mazeGroup.add (mazeSprite);
}

//create Blocker smaze Piece
function createBlockerMazePiece(x,y,w,h) {
  var mazeSprite = createSprite(x,y,w,h);
  mazeSprite.shapeColor="gray";
  blockerMazeGroup.add (mazeSprite);
}

function createSnake (x,y,Img) {
  var snake=createSprite(x,y,1,1);
  snake.addImage(Img);
  snake.scale=.2;  
  snakeGroup.add (snake);
  return snake ;
}  
