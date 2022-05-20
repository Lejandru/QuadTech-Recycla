let hours=00;
let mins=00;
let secs=00;
let time=null;

document.getElementById("close").onclick= function(){
    location.href= "#";
};

var gameover_sound=new Audio('Arcade-8-bit-death.mp3');


//turns of the visibility of the start button
let sOverlay=document.getElementById("start-overlay");
sOverlay.addEventListener('click',visibilityOff)
function visibilityOff(){
    sOverlay.classList.remove("visible");
}

document.getElementById("start-button").addEventListener('click',timer);
document.getElementById("start-button").addEventListener('click',gravity);
document.getElementById("start-button").addEventListener('click',score);
time=document.getElementById("time");
let eOverlay=document.getElementById("end-overlay");
// eOverlay.classList.add("visible")


//time tracker
function timer(){
    interval=setInterval(function(){
        secs++;
        document.getElementById("time").textContent= hours+":"+ mins +":"+secs;
        if (secs>59){
            secs=00;
            mins+=1;
            document.getElementById("time").textContent= hours+":"+ mins +":"+secs;
        }
        if(mins>59){
            secs=00;
            mins=00;
            hours+=1;
            document.getElementById("time").textContent= hours+":"+ mins +":"+secs;
        }
    },1000);
}

var pipe1;
var hole1;
var pipe2;


setInterval(()=>{
    pipe1=Math.floor(Math.random()*10)+35;
    hole1=Math.floor(Math.random()*20)+35;
    document.getElementById("pipe1").style.height=pipe1+"%";
    document.getElementById("pipe2").style.top=pipe1+hole1+"%";
    document.getElementById("pipe1").style.height= 100-(pipe1+hole1)+"%";
},2500);


var character=document.getElementById("bag");

function gravity() {

    //gravity functionality
    frameInterval=setInterval(()=>{
    //returns the top of the charcater from the CSS values
    var x=parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    //moves the top of the character down every 0.03 seconds by adding 3px to the top
    //if the top or bottom of the character touches the frame the game ends
    if(x<=400){
        character.style.top=(x+3)+"px";
    }else{
        clearInterval(interval);
        clearInterval(frameInterval);
        eOverlay.classList.add("visible");
        gameover_sound.play();
        // character.style.top=100+"px";
        // window.location.reload();
    }
},30);

document.addEventListener('keyup', event=>{
    if(event.code==='Space'){
        jump();
        var jump_sound=new Audio('Arcade-8-bit-jump.mp3');
        jump_sound.play();
    }
})


gameover=setInterval(()=>{
    //Checks if the bag collides with one obstacle and ends the game
    if (isCollision(document.getElementById("bag"),document.getElementById("pipe1"))){
        character.style.top=400+"px";
        clearInterval(interval);
        clearInterval(gameover);
        clearInterval(scoring);
        console.log(time);
        score=document.getElementById("score");
        console.log(score);
        eOverlay.classList.add("visible");
        gameover_sound.play();
        // window.location.reload();

    }
    //checks if the bag collides with the other obstacle and ends the game
    else if(isCollision(document.getElementById("bag"),document.getElementById("pipe2"))){
        character.style.top=400+"px";
        clearInterval(interval);
        clearInterval(gameover);
        clearInterval(scoring);
        console.log(time);
        score=document.getElementById("score");
        console.log(score);
        eOverlay.classList.add("visible");
        gameover_sound.play();
        // window.location.reload();
    }
    },100);

}

//Fly functionality
function jump(){
    var fly=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(fly>=14){
        character.style.top=(fly-40)+"px";
    }
}


//obstacle functionality
//compares the size and position of the objects in the parameter
function isCollision(el1,el2){
    var el1Rect=el1.getBoundingClientRect();
    var el2Rect=el2.getBoundingClientRect();
    return(el1Rect.right>=el2Rect.left && el1Rect.left<=el2Rect.right)&& (el1Rect.bottom>=el2Rect.top && el1Rect.top<=el2Rect.bottom);
}


// score functionality
function score(){
    var score=0;
    scoring=setInterval(()=>{
        score++;
        document.getElementById("score").textContent= score;
    },5000);
}
