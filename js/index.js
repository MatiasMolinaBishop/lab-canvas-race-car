window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
}

  //variables
  const canvas = document.getElementById('canvas')
  const canvasContext = canvas.getContext("2d")
  const imageRoad = new Image()
  imageRoad.src ='images/road.png'
  const imageCar = new Image()
  imageCar.src = 'images/car.png'

  let playing = true
  let pointsCounter = 0


//Create car class to give it methods for movement, drawing etc
class Car {
    constructor(){
      this.x = canvas.width/2,
      this.y = canvas.height -  110,
      this.w = 50,
      this.h = 100,
      this.speed = 20
    }
    //create method that draws the car
    drawCar(){
      // canvasContext.drawImage(imageCar, canvas.width/2,canvas.height - 110,50,100);
      canvasContext.drawImage(imageCar, this.x , this.y ,  this.w, this.h);
      console.log(this)
    }

    contains(b){
      return (this.x < b.x + b.w) &&
        (this.x + this.w > b.x) &&
        (this.y < b.y + b.h) &&
        (this.y + this.h > b.y)
    }

     moveLeft(){
       if(this.x<0){
         return
       }
       this.x = this.x - this.speed
     }

     moveRight(){
       if(this.x >canvas.width - this.w){// -this.w so that it doesnt disapear
         return
       }
         this.x = this.x + this.speed
     }
}

let car = new Car();

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 37){
    //move left
    car.moveLeft()
    console.log(e)
  } else if (e.keyCode === 39){
    //move right
    car.moveRight()
  }
})

class Obstacle{
  constructor(){
    this.x = Math.floor(Math.random()*400)
    this.y = 0,
    this.w = Math.floor(Math.random()*150)
    this.h = 20,
    this.speed = 3
  }

  drawObstacle(){
    this.y = this.y + this.speed
    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(this.x,this.y,this.w,this.h)
    if(this.y >= canvas.height){
      pointsCounter++
    }
  }

  contains(b){
    return (this.x < b.x + b.w) &&
      (this.x + this.w > b.x) &&
      (this.y < b.y + b.h) &&
      (this.y + this.h > b.y)
  }
}

let obstacleArray = []

setInterval(function(){ //This is a way of calling 2 function with the same interval time
  let obstacle = new Obstacle()
  obstacleArray.push(obstacle)
}, 1000)

  function startGame() {
    updateDrawing()
  }

  function updateDrawing(){

    if(playing){


    
    canvasContext.clearRect(0,0,canvas.width,canvas.height)//So the image doestn lag?
    canvasContext.drawImage(imageRoad, 0, 0, canvas.width, canvas.height)
    // canvasContext.drawImage(imageCar, canvas.width/2,canvas.height-110,50,100)

    car.drawCar()

    for(let i=0; i<obstacleArray.length; i++){
      obstacleArray[i].drawObstacle()
      if(car.contains(obstacleArray[i])){
        playing = false
      }
    }

    canvasContext.fillText(`Score: ${pointsCounter/100}`, 80,10)


    requestAnimationFrame(updateDrawing)//makes infinitw loop

  }
}
  

//requestAnimationFrame(updateDrawing)  ??? DID WE HAVE TO USE IT TWICE?