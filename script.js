const character = document.getElementById("character");
const stone = document.getElementById("stone");
const flower = document.getElementById("flower");
let counter = 0, distance = 0, char = 0, jumped = 0;

document.body.onclick = function(){
    char > 0 ? jump() : null;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        char > 0 ? jump() : null;
    }
}

function selectedChar(val){
    char = val;
    if(char == 2){
        character.style.backgroundImage = "url(panda.gif)";
        stone.style.backgroundImage = "url(stump.png)";
        flower.style.backgroundImage = "url(bamboo.png)";
        document.getElementById("game").style.backgroundImage = "url(bg-body-day.gif)";
        document.getElementById("game").style.backgroundSize = "cover";
        document.getElementById("point").innerHTML = "bambusa: ";
    }

    document.getElementById("game").style.display='block';
    document.getElementById("score").style.display='block';      
    document.getElementById("chars").style.display='none';    
    startGame();  

}

function showText(val){
    if(val == 1){
        document.getElementById("char-text").innerHTML = "Prikupljaš cvijeće i izbjegavaš kamenje.";
        document.getElementById("bic").style.opacity = 1;  
    }
    else{
        document.getElementById("char-text").innerHTML = "Prikupljaš bambu i izbjegavaš drveće (panjeve).";
        document.getElementById("panda").style.opacity = 1;  
    }
}

function jump(){
    if(jumped > 0){
        if(character.classList == "animate"){return}
        character.classList.add("animate");
        if(char == 1)
            new Audio("yupi.mp3").play();
        setTimeout(function(){
            character.classList.remove("animate");
        },500);
    }
    jumped++;
}

function startGame(){
    var checkDead = setInterval(function() {

        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let stoneLeft = parseInt(window.getComputedStyle(stone).getPropertyValue("left"));
        let flowerLeft = parseInt(window.getComputedStyle(flower).getPropertyValue("left"));

        if(stoneLeft<20 && stoneLeft>-20 && characterTop>=150){

            char == 1 ? character.style.backgroundImage = "url(bic_crashed.gif)" : character.style.backgroundImage = "url(panda_crashed.gif)";
            stone.style.animation = "none";
            character.style.animation = "none";
            flower.style.animation = "none";
            if(char == 2)
                document.getElementById("pointEnd").innerHTML = "bambusa: ";
            document.getElementById("scoreSpan").innerHTML = Math.round(counter/13);
            document.getElementById("distanceSpan").innerHTML = distance;
            document.getElementById('game-end').style.display='block';
            document.getElementById("score").style.display='none';   
            document.getElementById("game").style.display='none';     
            distance = 0;
            counter = 0;
            jumped = 0;
        }
        else{
            distance++;
            document.getElementById("distanceSpanBottom").innerHTML = distance;
            if(distance >= 1000){
                stone.style.animation = "stone 2s infinite linear"
            }
            if(distance >= (3000)){
                stone.style.animation = "stone 1s infinite linear"
            }
            if(distance >= 6000){
                stone.style.animation = "stone 3s infinite linear"
            }
            if(distance >= 10000){
                stone.style.animation = "stone 2s infinite linear"
            }
            if(distance >= 16000){
                stone.style.animation = "stone 1s infinite linear"
            }
        }
        if(flowerLeft<20 && flowerLeft>-20){
          
            counter++;
            
            document.getElementById("scoreSpanBottom").innerHTML = Math.round(counter/13);
           
        }
    
    }, 10);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm = "";
    m = checkTime(m);

    if (h > 12) {
    	h = h - 12;
    	ampm = " PM";
    } else if (h == 12){
        h = 12;
    	ampm = " AM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };
  
  if(h==0) {
    h=12;
  }
    
    document.getElementById('display').innerHTML = h+":"+m+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};
    return i;
}

function startDate() {
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("date").innerHTML = days[d.getDay()]+" | "+d.getDate()+"/"+[d.getMonth()+1]+"/"+d.getFullYear();
  }
  

setInterval(function(){
    genQuote();
    
},5000);

function genQuote() {
    var randNum = Math.floor(Math.random() * 8) + 1;
    document.getElementById('quote').innerHTML = quotes[randNum];
  }
  
  var quotes = ["The people who are crazy enough to think they can change the world are the ones who do. <br/>- Steve Jobs", "\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>", "\"Either I will find a way, or I will make one.\"<br> - Philip Sidney", "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- Thomas A. Edison", "\"You are never too old to set another goal or to dream a new dream.\"<br>- C.S Lewis", "\"If you can dream it, you can do it.\"<br>- Walt Disney", "\"Never give up, for that is just the place and time that the tide will turn.\"<br>- Harriet Beecher Stowe", "\"I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want.\"<br>- Muhammad Ali", "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"<br>- Bruce Lee",];