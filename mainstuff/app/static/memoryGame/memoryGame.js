const cards= document.querySelectorAll('.card');
let cardFlipped= false;
let lockBoard=false;
let card1, card2;
let hours=00;
let mins=00;
let secs=00;
let count=0;
var time=null;
var score=null;

// document.getElementById("play-again").addEventListener('click', window.location.reload);
// document.getElementById("return").onclick= function(){
//     location.href= "#";
// };


//Click to start game and timer
let sOverlay=document.getElementById("start-overlay");
sOverlay.addEventListener('click',visibilityOff);
let start= document.getElementById("start-button").addEventListener('click',timer);

function visibilityOff(){
    sOverlay.classList.remove("visible");
}


let eOverlay=document.getElementById("end-overlay");


function visibilityOn(){
    eOverlay.classList.add("visible");
}

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

var whoosh=new Audio('static/sounds/Whoosh-swoosh-transition.mp3 ');
function cardFlip() {
    if(lockBoard) return;
    if(this==card1) return;
    this.classList.toggle('flip');
    if(!cardFlipped){
        //first click
        cardFlipped=true;
        card1= this;
        whoosh.play();
        return;
    } else{
        //second click
        // cardFlipped=false;
        card2=this;
        whoosh.play();
        ifMatch();
    }
}

function ifMatch(){
        //checking if cards match
        if (card1.dataset.pair==card2.dataset.pair){
            disableCards();
            count++;
            console.log(count);
            score=document.getElementById("score").textContent= count;
            var match=new Audio('static/sounds/Game-coin-collect.mp3');
            match.play();
            allMatch();
        }else{
            unFlip();
        }        
}



function allMatch(){
    //checks if all pairs match, saves the time 
    // count represents the number of pairs in the game
    if (count==10){
        clearInterval(interval); 
        time=document.getElementById("time").textContent; 
        console.log(time);      
        eOverlay.classList.add("visible");   
        var win=new Audio('static/sounds/Crowd-applause.mp3');
        win.play();     
    }
}

function disableCards(){
    //if its a match the event listener is disabled
    card1.removeEventListener('click',cardFlip);
    card2.removeEventListener('click',cardFlip);
    reset();
}

function unFlip(){
    lockBoard=true;
    //if its not a match 
    setTimeout(() =>{
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    whoosh.play();
    reset();
    },1500);
}

function reset(){
    cardFlipped=false;
    lockBoard=false;
    card1=null;
    card2=null;
}

(function shuffle(){
    cards.forEach(card =>{
        let pos= Math.floor(Math.random()*20);
        card.style.order= pos;
    });
})();


cards.forEach(card => card.addEventListener('click', cardFlip));

