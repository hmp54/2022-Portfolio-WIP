const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
let particlesArray; 
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80) 
}

//event listener to get the position of the cursor 
window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x; 
        mouse.y = event.y; 
    }
);

//create particle
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x; 
        this.y = y; 
        this.directionX = directionX; 
        this.directionY = directionY; 
        this.size = size; 
        this.color = color; 
    }

    //function to draw individual particles
    draw(){
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
        ctx.fillStyle = '#d4ffdf'; 
        ctx.fill(); 
    }

    //check particle position, check mouse position
    update(){ 
        //check if particles are at edge of screen, reverse direction accordingly  
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX; 
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY; 
        }

        //collision detection
        let dx = mouse.x - this.x; 
        let dy = mouse.y - this.y; 
        let distance = Math.sqrt(dx*dy + dy*dy); 
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10; 
            }
            if(mouse.x > this.x && this.x > this.size *10){
                this.x -=10; 
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10; 
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10; 
            }
        } 
        //move our particle
        this.x += this.directionX; 
        this.y += this.directionY; 
        //draw particle
        this.draw(); 
    }
}

//create our particle array
function init(){
    particlesArray = []; 
    let numberOfParticles = (canvas.height * canvas.width) / 9000; 
    for(let i; i < numberOfParticles; i++){
        let size = (Math.random() * 5) + 1; 
        let x = (Math.random() * ((innerwidth - size * 2) - (size *2)) + size*2); 
        let y = (Math.random() * ((innerHeight - size * 2) - (size *2)) + size*2); 
        let directionX = (Math.random() * 5) - 2.5; 
        let directionY = (Math.random() * 5) - 2.5; 
        let color = '#d4ffdf';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color)); 
    }
}

//animation loop 
function animate(){
    requestAnimationFrame(animate); //API for smoother animation
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].updates(); 
    }
}

init(); 
animate(); 
console.log('hello, end of script'); 