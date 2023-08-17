var PLAY=1
var END=0
var gameState=PLAY
var trex,trex_running,trex_collided
var ground,invisible_ground,ground_img
var cloud_img,cloud_group
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle_group
var bg_img
var score=0
var game_over,restart
var game_overImg,restartImg
var jump_sound,collided_sound
var sun,sun_img

function preload(){
jump_sound=loadSound("assets/sounds/jump.wav")
collided_sound=loadSound("assets/sounds/collided.wav")
bg_img=loadImage("assets/backgroundImg.png")
sun_img=loadImage("assets/sun.png")
trex_running=loadAnimation("assets/trex_1.png","assets/trex_2.png","assets/trex_3.png")
obstacle1=loadImage("assets/obstacle1.png")
obstacle2=loadImage("assets/obstacle2.png")
obstacle3=loadImage("assets/obstacle3.png")
obstacle4=loadImage("assets/obstacle4.png")
restartImg=loadImage("assets/restart.png")
trex_collided=loadImage("assets/trex_collided.png")
cloud_img=loadImage("assets/cloud.png")
ground_img=loadImage("assets/ground.png")
game_overImg=loadImage("assets/gameOver.png")

}

function setup(){
createCanvas(windowWidth,windowHeight)

var message="hi krishna"
console.log(message)

sun=createSprite(width-300,100,10,10)
sun.addAnimation("sun",sun_img)
sun.scale=0.1

trex=createSprite(50,height-70,20,50)
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale=0.1

ground=createSprite(width/2,height,width,125)
ground.addImage("ground",ground_img)
ground.velocityX=-6
invisible_ground=createSprite(width/2,height-10,width,125)
invisible_ground.shapeColor="#F4CBAA"

game_over=createSprite(width/2,height/2-50)
game_over.addImage(game_overImg)
game_over.scale=0.5
game_over.visible=false

restart=createSprite(width/2,height/2)
restart.addImage(restartImg)
restart.scale=0.1
restart.visible=false

cloud_group=new Group()
obstacle_group=new Group()
}

function draw(){
background(bg_img)
drawSprites()
fill(0)
textSize(20)
text("SCORE : "+score,30,50)
trex.collide(invisible_ground)
if(gameState==PLAY){
    score+=1
    trex.changeAnimation("running",trex_running) 
    if(ground.x<0){
        ground.x=ground.width/2
    }
    if(keyDown("space")||touches.length>0){
        trex.velocityY=-10  
        touches=[]
    }
    trex.velocityY+=.8
    spawnClouds()
    spawnObstacles()
    if(obstacle_group.isTouching(trex)){
        gameState=END
    }
}
else if(gameState===END){
    game_over.visible=true
    restart.visible=true
    ground.velocityX=0
    trex.velocityY=0
    obstacle_group.destroyEach()
    cloud_group.destroyEach()
    trex.changeAnimation("collided")
    if(mousePressedOver(restart)||touches.length>0){
        reset()
        touches=[]
    
    }

}

}
function spawnClouds(){
    if(frameCount%60===0){
        var cloud=createSprite(width+20,height-300,40,10)
        cloud.y=random(100,250)
        cloud.addImage(cloud_img)
        cloud.velocityX=-3
        cloud.scale=0.5
        cloud.lifetime=width/3
        cloud_group.add(cloud)
    }
}
function spawnObstacles(){
    if(frameCount%60===0){
        var obstacle=createSprite(width+30,height-95,20,30)
        obstacle.velocityX=-6
        var ran=Math.round(random(1,4))
        switch(ran){
            case 1:obstacle.addImage(obstacle1)
            break
            case 2:obstacle.addImage(obstacle2)
            break
            case 3:obstacle.addImage(obstacle3)
            break
            case 4:obstacle.addImage(obstacle4)
            break
        }
        obstacle.scale=0.3
        obstacle.lifetime=width/6
        obstacle_group.add(obstacle)
    }
}
function reset(){
    gameState=PLAY
    game_over.visible=false
    restart.visible=false
    score=0
}