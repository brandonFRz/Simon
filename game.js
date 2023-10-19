let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let gameOn = false;

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let colorChosen = buttonColors[randomNumber];
    gamePattern.push(colorChosen);
    playSequence(gamePattern);
}

function playSequence(sequence) {
    let i = 0;
    const interval = setInterval(function () {
        playSound(sequence[i]);
        animatePress(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 400); // Ajusta el tiempo entre colores si lo deseas
}

function playSound(color){
    sound = new Audio("sounds/" + color + ".mp3")
    sound.play()
}

function animatePress(color){
    $("#" + color).addClass("pressed")
    setTimeout(function (){
        $("#" + color).removeClass("pressed")
    }, 200);
}

function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },400)

        }
    }else{
        playSound("Wrong");
        $("body").addClass("game-over")
        setTimeout(function (){
            $("body").removeClass("game-over")
        }, 300)
        $("#level-title").text("Gameover, Presione cualquier tecla para reiniciar");
        startOver();
    }
}

function startOver(){
    gamePattern = []
    userClickPattern = []
    level = 0
    gameOn = false
}

$(document).ready(function() {
    buttonColors.forEach(function(color) {
        $("#" + color).on("click", function() {
            if (gameOn) {
                userClickPattern.push(color);
                playSound(color);
                animatePress(color);
                checkAnswer(userClickPattern.length - 1);
            }
        });
    });
    $("body").on("keydown", function() {
        if (!gameOn) {
            gameOn = true;
            $("#level-title").text("Level " + level);
            nextSequence();
        }
    });
});