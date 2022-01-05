let canvas, ctx, circles, loopId, id; 
const WIDTH = window.innerWidth; 
const HEIGHT = window.innerHeight; 
const CIRCLE_AMOUNT = 100; 
const CIRCLE_COLOR = '#424d61ff';
const LINE_COLOR = '#424d61ff'; 
const RADIUS = 0.2; 
const VARIANT_RADIUS = 2; 
const SPEED = 01; 
const LINK_RADIUS = 100; 
const LINE_WIDTH = 0.25; 

(()=>{
    document.addEventListener('DOMContentLoaded', () => init())
})()

const init = () =>{
    console.log('initialized'); 
    canvas = document.querySelector('canvas'); 
    ctx = canvas.getContext('2d'); 
    resizeReset(); 
    initElements(); 
    startAnimation(); 
};

const resizeReset = () =>{
    console.log('resizeReset()'); 
    canvas.width = WIDTH; 
    canvas.height = HEIGHT;    
};

const initElements = () =>{
    console.log('initElements'); 
    circles = [];
    for(let i = 0; i < CIRCLE_AMOUNT; i++){
        circles.push(new Circle()); 
    }
};

const startAnimation = () =>{
    console.log('startAnimation'); 
    loopId = requestAnimationFrame(animationLoop); 
};

const animationLoop = () =>{
    console.log('animationLoop')
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    drawScene(); 
    id = requestAnimationFrame(animationLoop); 
}

const drawScene = () =>{
    console.log('drawScene'); 
    drawParticle(); 
    drawLine(); 
};

const drawLine = () =>{
    for(let i = 0; i < circles.length; i++){
        linkPoints(circles[i], circles); 
    }
}

const linkPoints = (point, hubs) =>{
    for(let i = 0; i < hubs.length; i++){
        let distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y); 
        const opacity = 2.95 - distance / LINK_RADIUS;
        if(opacity > 0){
            ctx.lineWidth = LINE_WIDTH; 
            ctx.strokeStyle = LINE_COLOR; 

            ctx.beginPath();
            ctx.moveTo(point.x, point.y); 
            ctx.lineTo(hubs[i].x, hubs[i].y); 
            ctx.closePath(); 
            ctx.stroke(); 
        } 
    }
}

const checkDistance = (x1, x2, y1, y2) =>{
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2)); 
}

const drawParticle = () =>{
    console.log('drawParticle');
    for(let i = 0; i < circles.length; i++){
        circles[i].update(); 
        circles[i].draw();
    }
};

function Circle(){
    console.log('Circle()'); 
    this.x = Math.random() * WIDTH; 
    this.y = Math.random() * HEIGHT; 

    this.color = CIRCLE_COLOR; 
    this.radius = RADIUS + Math.random() + VARIANT_RADIUS;
    this.speed = SPEED * Math.random() * SPEED; 
    this.directionAngle = Math.floor(Math.random()*360);  
    
    this.vector = {
       x: Math.cos(this.directionAngle) * this.speed,
       y: Math.sin(this.directionAngle) * this.speed,
    }

    this.update = function (){
        if(this.x >= WIDTH || this.x <= 0){
            this.vector.x = -1; 
        }

        if(this.y >= HEIGHT || this.y <= 0){
            this.vector.y = -1; 
        }

        if(this.x > WIDTH) this.x = WIDTH; 
        if(this.y > HEIGHT) this. y = HEIGHT; 

        if(this.x < 0) this.x = 0; 
        if(this.y < 0) this.y = 0; 

        this.x += this.vector.x; 
        this.y += this.vector.y; 
    };

    this.draw = function (){
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); 
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill(); 
    };
};
