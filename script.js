const CHOICES = ["red", "green", "blue", "yellow"];


let series;
let score = 1;
let element;
let id;
let color;
let seriesShown = false;
let showingAgain = false;
let firstRound1;
let rank = 0;
let showAgainButton = document.getElementById("showAgain");
let scoreElement = document.getElementById("levelDisplay");
let firstRound = true;
var collection = document.getElementsByClassName("levelSquare");


function addScore(){
    score++;
    scoreElement.innerHTML += "<div class='levelSquare'></div>";
}

async function gameOver() {
    const collection = document.getElementsByClassName('levelSquare');
  
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
    // Function to animate a single div
     async function animateDiv(div) {
      div.style.backgroundColor = "red";
      await delay(200);
      div.style.backgroundColor = "rgb(35, 255, 0)";
      await delay(200);
      div.style.backgroundColor = "red";
      await delay(200);
      div.style.backgroundColor = "rgb(35, 255, 0)";
      await delay(200);
      div.style.backgroundColor = "red";
      await delay(200);
      div.style.backgroundColor = "rgb(35, 255, 0)";
      await delay(200);
    };
  
    // Loop through each div in the collection and start the animation
    await Promise.all(Array.from(collection).map(div => animateDiv(div)));
  
    showAgainButton.innerHTML = "Play";
    score = 1;
    rank = 0;
    seriesShown = false;
    showingAgain = false;
    firstRound = true;
    scoreElement.innerHTML = "<div class='levelSquare'></div>";
  }

async function createSerie(){
    if (firstRound){
        firstRound = false;
        firstRound1 = true;
    }
    seriesShown = false;
    showAgainButton.style.opacity = "0.5";
    await new Promise(resolve => setTimeout(resolve,200));

    series = [];
    rank = 0;


    for (let i = 0; i < score; i++){
        color = Math.floor(Math.random() * CHOICES.length);
        series.push(CHOICES[color]);
    }

    for (let i = 0; i < series.length; i++){
        id = series[i];
        element = document.getElementById(id);
        await new Promise(resolve => setTimeout(resolve,1000));
        element.style.opacity = ".5";
        await new Promise(resolve => setTimeout(resolve,1000));
        element.style.opacity = "1";
    }

    await new Promise(resolve => setTimeout(resolve,200));
    seriesShown = true;
    showAgainButton.style.opacity = "1";

    if (firstRound1){
        showAgainButton.innerHTML = "Show Again";
        firstRound1 = false;
    }
}

async function showSerieAgain(){
    if (seriesShown && !showingAgain){
        showingAgain = true;
        showAgainButton.style.opacity = "0.25";
        await new Promise(resolve => setTimeout(resolve,200));

        for (let i = 0; i < series.length; i++){
                id = series[i];
                element = document.getElementById(id);
                element.style.opacity = ".5";
                await new Promise(resolve => setTimeout(resolve,1000));
                element.style.opacity = "1";
                await new Promise(resolve => setTimeout(resolve,1000));
        }

        await new Promise(resolve => setTimeout(resolve,200));
        showAgainButton.style.opacity = "1";
        showingAgain = false;
    } else if (firstRound){
        createSerie();
    }
}


async function colorPressed(color){
    if (seriesShown){
        element = document.getElementById(color);
        element.style.opacity = "0.5";
        await new Promise(resolve => setTimeout(resolve,150));
        element.style.opacity = "1";
        if (color === series[rank]){
            if (rank + 1 === series.length){
                await new Promise(resolve => setTimeout(resolve,1000));
                addScore();
                createSerie();
            }
            rank++;
        } else {
            gameOver();
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'p'){
        showSerieAgain();
    }
  });

document.addEventListener('keydown', function(event) {
    if (event.key === 'r'){
        colorPressed('red');
    }
  });
  
document.addEventListener('keydown', function(event) {
    if (event.key === 'g'){
        colorPressed('green');
    }
  });
  
document.addEventListener('keydown', function(event) {
    if (event.key === 'b'){
        colorPressed('blue');
    }
  });
  
document.addEventListener('keydown', function(event) {
    if (event.key === 'y'){
        colorPressed('yellow');
    }
  });