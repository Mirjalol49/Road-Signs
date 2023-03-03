const startBtn = document.querySelector(".start-btn");
const startBox = document.querySelector(".box");
const elForm = document.querySelector(".js-form");

const selectType = document.querySelector(".js-question-select");
const selectTime = document.querySelector(".js-time-select");

const modal = document.querySelector(".modal");
const pointCount = document.querySelector(".point-count");
const attemptCount = document.querySelector(".attempt-count");
const timeCount = document.querySelector(".time-count");
const signImgList = document.querySelector(".js-img-list");
const signTitle = document.querySelector(".js-title");


const endGame = document.querySelector(".end-game");
const endGamePoint = document.querySelector(".end-game-point");
const resetBtn = document.querySelector(".button-reset");

const winGame = document.querySelector(".win-game");
const winGameTotal = document.querySelector(".point-count-win");
const reloadBtn = document.querySelector(".btn-reset");

let myTime = 0;
let score = 0;
let attemp = 5;

const signArray =[];
const randomArrayFind =[];

// start
startBtn.addEventListener("click", function(evt){
  startBox.classList.add("d-none");
  elForm.classList.remove("d-none");
  elForm.classList.add("d-block")
});



// Random array
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  shuffle(roadSymbols)

  let randomIndex;

  // Random title

  function titleQuestion(){
    if(randomArrayFind.length > 0 && myTime !=0){
      signTitle.textContent = randomArrayFind[0].symbol_title;
    }
    if (randomArrayFind.length == 0 && myTime !=0){
      winnerr()
      document.querySelector(".win-sound").play();
    }
    if(myTime == 0 && randomArrayFind.length > 0){
      endGameFunc();
    }
  }
  console.log(myTime);
  function timerFunc (selectTimeValue){
    myTime = Number(selectTimeValue)*60;
    let checkFun = () => {
      let allTime =
      `${Math.floor(myTime / 60)}`.padStart(2, "0") +
      ":" +
      `${myTime % 60}`.padStart(2, "0");
      --myTime;
      if(myTime == 0 && randomArrayFind.length > 0){
        endGameFunc()
      }
      if(myTime >= 0){
        checkingTime ;
      }else{
        stopInterval();
      }
      timeCount.textContent = allTime;
    };
    let checkingTime = setInterval(checkFun, 1000);
    let stopInterval = () => clearInterval(checkingTime);
  }

  const template = document.querySelector(".temp").content;

  function renderSigns(array){
    signImgList.innerHTML = null;
    const frag = new DocumentFragment();

    array.forEach(element => {
      const templateItem = template.cloneNode(true);
      if(indexs.includes(element.id)){
        templateItem.querySelector(".sign-item").classList.add("bg-success");
        templateItem.querySelector(".sign-item").classList.add("checked-true");

      }
      templateItem.querySelector(".sign-item").dataset.id = element.id;
      templateItem.querySelector(".sign-img").src = element.symbol_img;
      frag.appendChild(templateItem);
    });
    signImgList.appendChild(frag);
  };

  elForm.addEventListener("submit", function(evt){
    pointCount.textContent = score;
    attemptCount.textContent = attemp;
    evt.preventDefault();
    if(selectType.value == "easy"){
      modal.classList.add("show");
      elForm.classList.remove("d-block");
      elForm.classList.add("d-none");
      roadSymbols.slice(0,24).forEach(item => signArray.push(item));
      signArray.forEach(item => randomArrayFind.push(item));
      shuffle(randomArrayFind);
      renderSigns(roadSymbols.slice(0,24));
    }
    if(selectType.value == "medium"){
      modal.classList.add("show");
      elForm.classList.remove("d-block");
      elForm.classList.add("d-none");
      roadSymbols.slice(0,48).forEach(item => signArray.push(item));
      signArray.forEach(item => randomArrayFind.push(item));
      shuffle(randomArrayFind);
      renderSigns(roadSymbols.slice(0,48));
    }
    if(selectType.value == "hard"){
      modal.classList.add("show");
      elForm.classList.remove("d-block");
      elForm.classList.add("d-none");
      roadSymbols.slice(0,72).forEach(item => signArray.push(item));
      signArray.forEach(item => randomArrayFind.push(item));
      shuffle(randomArrayFind);
      renderSigns(roadSymbols.slice(0,72));
    }
    if(selectTime.value == "3"){
      timerFunc(selectTime.value);
    }
    if(selectTime.value == "5"){
      timerFunc(selectTime.value);
    }
    if(selectTime.value == "8"){
      timerFunc(selectTime.value);
    }
    titleQuestion()
  });

  const indexs = [];

  function winnerr(){
    modal.classList.remove("show");
    winGame.classList.remove("d-none");
    winGame.classList.add("d-block");
    winGameTotal.textContent = score;
    reloadBtn.addEventListener("click", function(evt){
      evt.preventDefault();
      window.location.reload()
    });
  };

  function endGameFunc (){
    modal.classList.remove("show");
    document.querySelector(".end-game-sound").play();
    endGame.classList.remove("d-none");
    endGame.classList.add("d-block");
    endGamePoint.textContent = score;
    resetBtn.addEventListener("click", function(evt){
      evt.preventDefault();
      window.location.reload()
    });
  }

  const failSound  = new Audio("sounds/denie-96177.mp3");
  const checkedSound = new Audio("sounds/correct-2-46134.mp3");

  signImgList.addEventListener("click", function(evt){
    evt.preventDefault();
    if(evt.target.matches(".sign-item")){
      const imgId = Number(evt.target.dataset.id);
      if(attemp > 0){
        if(imgId == randomArrayFind[0].id){
          score += 2;
          indexs.push(imgId);
          pointCount.textContent = score;
          winGameTotal.textContent =score;
          checkedSound.play();
          randomArrayFind.splice(0,1);
          titleQuestion();
          renderSigns(signArray);
        } else{
          --score;
          --attemp;
          pointCount.textContent = score;
          attemptCount.textContent = attemp;
          failSound.play();
          evt.target.classList.add("bg-danger");
          evt.target.classList.add("shake");
        }
      }
      if(attemp == 0){
        endGameFunc();
      };
    };
  });

  const timerSaw = document.querySelector(".time-count");
