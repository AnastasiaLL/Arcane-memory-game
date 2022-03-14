const cards = document.querySelectorAll(".memory-card");
let hasflippedCard = false;
let firstCard;
let secondCard;
let lockboard = false;
let moves = 0;
const sum = document.querySelector('.sum');
let sumMatch = 0;



function flipCard () {
    if (lockboard) return
    if (this === firstCard) return

    this.classList.add('flip');
    if (!hasflippedCard) {
            // first click
            playcardsSound()
        firstCard = this;
        hasflippedCard = true;
     return
    }
        // second click
        sumMoves ()
    secondCard = this;
    hasflippedCard = false;

    checkForMatch ()
};

function checkForMatch () {
   let isMatch = firstCard.dataset.number === secondCard.dataset.number;
   isMatch ? match () : notMatch() 
}

function match (){
    playMatchSound()
    firstCard.removeEventListener('click', flipCard );
    secondCard.removeEventListener('click', flipCard );

    lockboard = true;
    setTimeout( () => {
        firstCard.classList.add('delete');
        secondCard.classList.add('delete');
        lockboard = false;
    }, 1000 );

    sumMatches();
    
}

function notMatch(){
    lockboard = true;

    pauseSound()
    playcardsSound()

    setTimeout( () => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockboard = false;
    }, 1300 );
}

(function shuffle() {
    cards.forEach( card => {
        let randomPos = Math.floor( Math.random() * 12);
        card.style.order = randomPos;   
    })
})();

function sumMoves () {
    moves = moves + 1;
    sum.textContent = `Your moves: ${moves}`;

    // добавляем кол-во ходов объект:
    objMoves.score = moves;
    console.log(objMoves);
    
}


function sumMatches(){
    sumMatch = sumMatch + 1;
    if (sumMatch === 6){ 
        console.log ('game over')

        // в конце игры добавляем объект в массив:
        scores.push(objMoves);
        console.log (scores)

        setTimeout( ()=> {
            startTableResults();
        }, 2600);
    };
}


cards.forEach( card => card.addEventListener('click', flipCard ) );


// start sounds

const audio = new Audio();

function playcardsSound(){
    audio.src = 'assets/card.mp3'
    audio.play()
}

function playBtnSound(){
    audio.src = 'assets/SHOCKC.mp3'
    audio.play()
}

function playMatchSound(){
    audio.src = 'assets/match.mp3'
    audio.play()
}

function pauseSound(){
    audio.pause()
    audio.currentTime = 0
}

// end sounds



//start local storage

    //  Как получаем значения в scores:
    // 1. Создаем пустой массив scores
    // 2. Создаем объект objMoves
    // 3. в функции sumMoves ставим счетчик ходов, добавляем ходы в объект objMoves (objMoves.score = moves)
    // 4. в функции sumMatches() считаем количество мэтчей. когда доходит до 6-ти (конец игры), добавляем объект objMoves в массив scores ( scores.push(objMoves) )

    //  Как получаем и загружаем данные в local storage:
    // 3. Создаем переменную а, в которую загружаем данные из local storage с помощью getItem и путем преобразования строки в массив 
    // 4. если в а ничего нет, то приравниваем ее к нашему пустому массиву scores
    // 5. если в а есть значения и их меньше 10, то пушим все значения из массива scores
    // 6. если в а есть значения и их = < 10, то удаляем первое значение пушим в конец все значения из массива scores

    let scores = [];

    let objMoves = {
        name: 'Anastasia',
        score: moves,
    };

    let a = JSON.parse(localStorage.getItem('rez'));


    // создаем функцию для добавления объекта в массив localStorage
    function pushObjInLS () {

        if (a === null){
            a = scores;
            console.log(1);
        } else{
            if (a.length >= 10){
                a.shift();
                a.forEach(keys => {scores.push(keys)})
                console.log (3)
            } else{
                a.forEach(keys => {scores.push(keys)})
                console.log(2);
            }
        };
    };

    pushObjInLS ()
    

    function setLocalStorage() {
        localStorage.setItem('rez', JSON.stringify(scores) );
    }

    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        let rez = localStorage.getItem('rez');
        console.log( JSON.parse(rez)  );
    }
    window.addEventListener('load', getLocalStorage)

// end local storage


// start table results

    let best = document.querySelector('.best');
    best.innerHTML = `<ul class="ul"></ul>`;


        //  функция для создания таблицы результатов из LocStor

    function tableResults(){
        for (let i = 0; i< a.length; i++){
            let li = document.createElement('li');
            li.innerHTML = `<li class="li"> Your moves: ${a[i].score}`
            document.querySelector('.ul').appendChild(li);
        };
    }

    tableResults()

// end table results

// start Hello-container

let helloContainer = document.querySelector('.hello');
let memoryGameContainer = document.querySelector('.delete-memory-game');

let playBtn = document.querySelector('.start-button');
let tableplayBtn = document.querySelector('.table-start-button');

let background = document.querySelector('.main-background');
let showMoves = document.querySelector('.sum');

let tableBtn2 = document.querySelector('.table-button2');


function startGame(){
    playBtnSound()
    helloContainer.classList.add('delete-hello');

    memoryGameContainer.classList.remove('delete-memory-game');
    memoryGameContainer.classList.add('memory-game');

    background.classList.remove('main-background');
    background.classList.remove('table-background');
    background.classList.add('game-background');

    showMoves.classList.remove('sum');
    showMoves.classList.add('sum-open');

    tableBtn2.classList.remove('table-button2');
    tableBtn2.classList.add('table-button2-open');

    tablerez.classList.remove('table-open');
    tablerez.classList.add('table');
}
playBtn.addEventListener('click', startGame);



function tableStartGame(){
    location.reload()
}

tableplayBtn.addEventListener('click', tableStartGame);



// end Hello-container


// start table results container

let tablerez = document.querySelector('.table');
let tableBtn = document.querySelector('.table-button');

function startTableResults(){

    playBtnSound()

    helloContainer.classList.add('delete-hello');

    tablerez.classList.remove('table');
    tablerez.classList.add('table-open');

    memoryGameContainer.classList.remove('memory-game');
    memoryGameContainer.classList.add('delete-memory-game');

    background.classList.remove('game-background');
    background.classList.add('table-background');

}

tableBtn2.addEventListener('click', startTableResults);
tableBtn.addEventListener('click', startTableResults);



// end table results container

