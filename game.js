var gamePattern = new Array();
var userPattern = new Array();
var colors = new Array("green", "red", "yellow", "blue");
var level = 0;
var gameStarted = false;
var result = false;

$("." + "btn").click(function handleButtonClick() {
  var userSelectedButton = this.id;
  userPattern.push(userSelectedButton);
  playSound(userSelectedButton);
  animate(userSelectedButton);

  if (checkAnswer() == null){
   console.log("null tha");
  }else if (checkAnswer()){
    nextSequence();
  }
  else{
    gameOver();
  }
});

//Playing the sound
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//Fade in fade out
function animate(color) {
  var button = $("#" + color);

  button.addClass("pressed");

  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

// For computer to generate

function nextSequence() {
  $("#" + "level-title").text("Level : " + level);
  userPattern = [];
  var random = Math.floor(Math.random() * colors.length);
  var gameButton = colors[random];

  playSound(gameButton);
  animate(gameButton);
  level++;
  gamePattern.push(gameButton);
}

function checkAnswer() {
  console.log(gamePattern);
  console.log(userPattern);
  if (userPattern.length == gamePattern.length) {
    for (var i = 0; i < userPattern.length; i++){
      if (userPattern[i] != gamePattern[i]){
        return false;
      }
    }
    return true;
  }
}

function gameOver(){
  $("body").addClass("game-over");
  $("#" + "level-title").text("Press any key to restart");
  startOver()
}

function startOver(){
  level = 0;
  gamePattern = new Array();
  userPattern = new Array();
  result = false;
  gameStarted = false;
  
}

// Game initialization
$(document).keypress(function () {
  if (!gameStarted) {
    $("body").removeClass("game-over");
    nextSequence();
    gameStarted = true;
  }
});
