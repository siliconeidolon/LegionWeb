class Die {
  constructor() {
    this.isKeptThisTurn = false;
    this.isSaved = false;
    this.value = 0;
  }

  getValue() {
    return this.value;
  }

  setValue(number) {
    this.value = number;
  }

  getIsKeptThisTurn() {
    return this.isKeptThisTurn;
  }

  setIsKeptThisTurn(bool) {
    this.isKeptThisTurn = bool;
  }

  getIsSaved() {
    return this.isSaved;
  }

  setIsSaved(bool) {
    this.isSaved = bool;
  }
}

let keptDie = 0;
let isTurnOne = true;
let turnScore = 0;
let userScore = 0;
let trackerScore = 0;
let resultMessage = "";
let computerScore = 0;
let doubleCounter = 0;
let frequencyMap = {};
let overallFrequencyMap = {};
let dieOne = new Die();
let dieTwo = new Die();
let dieThree = new Die();
let dieFour = new Die();
let dieFive = new Die();
let dieSix = new Die();
let dieArray = new Array(dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix);

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const result_p = document.querySelector(".result > p");

const dieOne_div = document.getElementById("die-1");
let dieOne_img = document.getElementById("dieOnePic");

const dieTwo_div = document.getElementById("die-2");
let dieTwo_img = document.getElementById("dieTwoPic");

const dieThree_div = document.getElementById("die-3");
let dieThree_img = document.getElementById("dieThreePic");

const dieFour_div = document.getElementById("die-4");
let dieFour_img = document.getElementById("dieFourPic");

const dieFive_div = document.getElementById("die-5");
let dieFive_img = document.getElementById("dieFivePic");

const dieSix_div = document.getElementById("die-6");
let dieSix_img = document.getElementById("dieSixPic");

let dieDivArray = new Array(dieOne_div, dieTwo_div, dieThree_div, dieFour_div, dieFive_div, dieSix_div);
let dieImageArray = new Array(dieOne_img, dieTwo_img, dieThree_img, dieFour_img, dieFive_img, dieSix_img);


const dieOnePicURL = "images/die-1.png";
const dieTwoPicURL = "images/die-2.png";
const dieThreePicURL = "images/die-3.png";
const dieFourPicURL = "images/die-4.png";
const dieFivePicURL = "images/die-5.png";
const dieSixPicURL = "images/die-6.png";

const diePics = new Array(dieOnePicURL, dieTwoPicURL, dieThreePicURL, dieFourPicURL, dieFivePicURL, dieSixPicURL);

const roll_button = document.getElementById("roll-button");
const keep_button = document.getElementById("keep-button");

function clearFrequencyMaps() {
  for(let number in frequencyMap) {
    delete frequencyMap[number];
  }

  for(let number in overallFrequencyMap) {
    delete overallFrequencyMap[number];
  }
}

function checkDoubles() {
  let doubleCounter = 0;
  for(let number in overallFrequencyMap) {
    if(overallFrequencyMap[number] === 2) {
      doubleCounter++;
    }
  }
  if(doubleCounter === 3) {
    userScore+= 1000;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = "DOUBLES!";
  }
}

function checkSixOfAKind() {
  for(let number in overallFrequencyMap) {
    if(overallFrequencyMap[number] === 6) {
      userScore+= 5000;
      userScore_span.innerHTML = userScore;
      result_p.innerHTML = "SIX OF A KIND!";
      break;
    }
  }
}
function checkCircus() {
  let circusCounter = 0;
  for(let number in overallFrequencyMap) {
    if(overallFrequencyMap[number] === 1) {
      circusCounter++;
    }
  }
  if(circusCounter === 6) {
    userScore+= 2000;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = "CIRCUS! 2000 points!";
  }
}

function checkOnes() {
  if('1' in overallFrequencyMap) {
    let numOfOnes = overallFrequencyMap[1];

    if(numOfOnes === 4) {
      result_p.innerHTML = "4 Ones...Your total score is 0";
      userScore = 0;
      userScore_span.innerHTML = userScore;
      return;
    }
  }

  if('1' in frequencyMap) {
    let numOfOnes = frequencyMap[1];
    turnScore+= numOfOnes * 5;
    resultMessage+= `${numOfOnes} one's : `;
  }
}

function checkTwos() {
  if('2' in frequencyMap) {
    let numOfTwos = frequencyMap[2];
    turnScore+= numOfTwos * 10;
    resultMessage+= `${numOfTwos} two's : `
  }
}

function checkThrees() {
  if('3' in frequencyMap) {
    let numOfThrees = frequencyMap[3];
    if(numOfThrees >= 3) {
      turnScore+= 50;
      resultMessage+= "3 threes : "
    }
  }
}

function checkFours() {
  if('4' in frequencyMap) {
    let numOfFours = frequencyMap[4];
    if(numOfFours >= 3) {
      turnScore+= 100;
      resultMessage+= "3 fours : "
    }
  }
}

function checkFives() {
  if('5' in frequencyMap) {
    let numOfFives = frequencyMap[5];
    if(numOfFives >= 3) {
      turnScore+= 500;
      resultMessage+= "3 fives : "
    }
  }
}

function checkSixes() {
  if('6' in frequencyMap) {
    let numOfSixes = frequencyMap[6];
    if(numOfSixes >= 3) {
      turnScore+= 1000;
      resultMessage+= "3 sixes : "
    }
  }
}

function checkScore() {
  checkDoubles();
  checkCircus();
  checkSixOfAKind();
  checkOnes();
  checkTwos();
  checkThrees();
  checkFours();
  checkFives();
  checkSixes();
}

function showTurnScore() {
  resultMessage+= `${turnScore} points!`;
  result_p.innerHTML = resultMessage;
  resultMessage = "";
}

function rollDice() {

  roll_button.disabled = true;
  trackerScore = turnScore;
  clearFrequencyMaps();

  for(let i = 0; i < dieArray.length; i++) {
    if(dieArray[i].getIsKeptThisTurn()) {
      dieArray[i].setIsSaved(true);
      dieDivArray[i].removeEventListener('click', keepDie);
    }
  }



  for(let i = 0; i < dieArray.length; i++) {
    const randomNumber = Math.floor(Math.random() * 6);
    if(!(dieArray[i].getIsKeptThisTurn()) && !(dieArray[i].getIsSaved())) {
      dieImageArray[i].src = diePics[randomNumber];
      dieArray[i].setValue(randomNumber + 1);
    }
    if(dieArray[i].getIsKeptThisTurn()) {
      dieArray[i].setIsSaved(true);
    }
  }

  for(let i = 0; i < dieArray.length; i++) {
    let dieValue = dieArray[i].getValue();
    if(!(dieArray[i].getIsSaved())) {
      if(!(dieValue in frequencyMap)) {
        frequencyMap[dieValue] = 1;
      }
      else {

        frequencyMap[dieValue]++;
      }
    }

    if(!(dieValue in overallFrequencyMap)) {
      overallFrequencyMap[dieValue] = 1;
    }
    else {
      overallFrequencyMap[dieValue]++;
    }
  }
  checkScore();
  if(trackerScore === turnScore) {
    turnScore = 0;
    result_p.innerHTML = "No scoring combination.  Turn score is 0";
  }
  else {
      showTurnScore();
  }

}

function keepDie(dieDiv, imageNumber) {
  dieDiv.setIsKeptThisTurn(!dieDiv.getIsKeptThisTurn());
  if(dieDiv.getIsKeptThisTurn()) {
    dieImageArray[imageNumber].classList.add('green-glow');
    keptDie++;
  } else if(!dieDiv.getIsSaved()){
    dieImageArray[imageNumber].classList.remove('green-glow');
    keptDie--;
  }

  if(keptDie > 0) {
    roll_button.disabled = false;
  }
  else {
    roll_button.disabled = true;
  }
}

function main() {
  roll_button.addEventListener('click', () => rollDice());
  for(let i = 0; i < 6; i++) {
    dieDivArray[i].addEventListener('click', keepDie.bind(null, dieArray[i], i));
  }
}

main();
