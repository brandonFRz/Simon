let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let gameOn = false
let level = 0

function nextSequense(){
    userClickedPattern = []
    level ++
    $("#level-title").text("Level " + level)
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
}

function playSound(color){
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(color){
    $("."+ color).addClass("pressed");
    setTimeout(function (){
       $("."+ color).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function (){
                nextSequense()
            }, 600);
        }
    }else{
        playSound("Wrong")
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game over, Presiona cualquier tecla para reiniciar")
        startOver()
    }
}

function startOver(){
    gamePattern=[]
    userClickedPattern=[]
    level = 0
    gameOn = false
}
$(document).ready(function (){
   buttonColours.forEach(function (color){
       $("#" + color).on("click", function (){
           if (gameOn){
               userClickedPattern.push(color)
               $("."+color).fadeOut(100).fadeIn(100)
               animatePress(color)
               playSound(color)
               checkAnswer(userClickedPattern.length-1)
           }

       })
   })

    $(document).on("keydown", function(){
        if (!gameOn){
            gameOn =true;
            $("#level-title").text("Level " + level)
            nextSequense();
        }


    });
});