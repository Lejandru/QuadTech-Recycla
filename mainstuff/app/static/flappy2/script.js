var pipe1;
var hole1;
var pipe2;

setInterval(()=>{
    pipe1=Math.floor(Math.random()*10)+30;
    hole1=Math.floor(Math.random()*20)+20;
    document.getElementById("pipe1").style.height=pipe1+"%";
    document.getElementById("pipe2").style.top=pipe1+hole1+"%";
    document.getElementById("pipe1").style.height= 100-(pipe1+hole1)+"%";
},2500);


var character=document.getElementById("bag");

//gravity functionality
setInterval(()=>{
    var x=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(x<=510){
        character.style.top=(x+3)+"px";
    }else{
        alert("Game Over. Score:" + score);
        character.style.top=100+"px";
        window.location.reload();
    }

},30);

//Fly functionality
function jump(){
    var fly=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(fly>=14){
        character.style.top=(fly-40)+"px";
    }
}

document.addEventListener('keyup', event=>{
    if(event.code==='Space'){
        jump();
    }
})

//score functionality

var score=0;
setInterval(()=>{
    score++;
    document.getElementById("score").innerHTML=score;
},500);

//obstacle functionality
function isCollision(el1,el2){
    var el1Rect=el1.getBoundingClientRect();
    var el2Rect=el2.getBoundingClientRect();

    return(el1Rect.right>=el2Rect.left && el1Rect.left<=el2Rect.right)&& (el1Rect.bottom>=el2Rect.top && el1Rect.top<=el2Rect.bottom);
}

setInterval(()=>{
    if (isCollision(document.getElementById("bag"),document.getElementById("pipe1"))){
        character.style.top=513+"px";
        setTimeout(()=>{
            alert("Game Over. Score:"+ score);
            return;
        },10);
        window.location.reload();
    }
    else if(isCollision(document.getElementById("bag"),document.getElementById("pipe2"))){
        character.style.top=513+"px";
        setTimeout(()=>{
            alert("Game Over. Score:"+ score);
            return;
        },10);
        window.location.reload();
    }
},100);