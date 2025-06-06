let actions = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;
let rounds = 1;
const resultDiv = document.querySelector(".Result")
const scoreDiv = document.querySelector(".Score")

//randomly returns an action
function getComputerChoice() {
    let index = Math.floor(Math.random() * actions.length);
    return actions[index];
}

function playRound(humanChoice, computerChoice) {
    //switch statements to decide round winner
    let matchup = `${humanChoice.toLowerCase()} vs ${computerChoice.toLowerCase()}`;

    switch (matchup) {
        //player wins
        case "rock vs scissors":
        case "paper vs rock":
        case "scissors vs paper":
            humanScore += 1;
            return "You Win! :)";

        //computer wins
        case "scissors vs rock":
        case "rock vs paper":
        case "paper vs scissors":
            computerScore += 1;
            return "Computer wins :(";

        //tie cases
        case "rock vs rock":
        case "paper vs paper":
        case "scissors vs scissors":
            return "It's a tie!";

        default:
            return "Invalid input"
    }
}

function updateScore(result, humanChoice, computerChoice) {
    //removing all other children (since score updated)
    resultDiv.querySelectorAll("p").forEach(p => p.remove());
    scoreDiv.querySelectorAll("p").forEach(p => p.remove());

    //new result and score para
    const resultPara = document.createElement("p");
    resultPara.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}. ${result}`;
    resultDiv.appendChild(resultPara);

    const scorePara = document.createElement("p");
    scorePara.textContent = `You: ${humanScore} | Computer: ${computerScore} (Round ${rounds}/5)`;
    scoreDiv.appendChild(scorePara);
}

//checking for winner after 5 rounds are over
function checkWinner() {
    if (rounds == 5) {
        //game ended
        document.querySelectorAll("button").forEach(btn => btn.disabled = true);
        const winnerText = document.createElement("h1");
        winnerText.classList.add("Winner");

        if (humanScore > computerScore) {
            winnerText.textContent = "You won the game! 🎉";
        } else if (computerScore > humanScore) {
            winnerText.textContent = "Computer wins the game!";
        } else {
            winnerText.textContent = "It's a tie game!";
        }
        document.body.appendChild(winnerText);

        //added reset button
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Play Again";
        resetBtn.classList.add("reset-btn");
        resetBtn.addEventListener("click", resetGame);

        document.body.appendChild(winnerText);
        document.body.appendChild(resetBtn);
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    rounds = 1;

    //enabling buttons
    document.querySelectorAll("button:not(.reset-btn)").forEach(btn => btn.disabled = false);

    resultDiv.querySelectorAll("p").forEach(p => p.remove());
    scoreDiv.querySelectorAll("p").forEach(p => p.remove());

    document.querySelector(".Winner")?.remove();
    document.querySelector(".reset-btn")?.remove();
}

document.querySelectorAll('button:not(.reset-btn)').forEach(button => {
    button.addEventListener('click', () => {
        if (rounds > 5) return;

        const humanChoice = button.textContent;
        const computerChoice = getComputerChoice();
        const result = playRound(humanChoice, computerChoice);

        updateScore(result, humanChoice, computerChoice);

        //checking winner before incrementing
        if (rounds == 5) {
            checkWinner();
        }

        rounds += 1;
    });
});