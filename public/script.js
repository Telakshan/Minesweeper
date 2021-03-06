
document.addEventListener('DOMContentLoaded', () => {

const panel = document.querySelector('.panel');
let numberOfFlags = 0;
let gameEnd = false;
let board = [];
let width = 10;      
let numberOfMines = 20;
let Mines = Array(numberOfMines).fill('mine');
let emptyArray = Array(width * width - numberOfMines).fill('safe');
let gameArray = emptyArray.concat(Mines);
let shuffle = gameArray.sort(() => Math.random() - 0.5);

    newGame();


    function createBoard(){
        
    

        for(let i=0; i<width * width; i++){
            const box = document.createElement('div')
            box.setAttribute('id', i);
            box.classList.add(shuffle[i]);
            panel.appendChild(box);
            board.push(box);
            
            //event listener

            box.addEventListener('click', function(event){
                
                click(box);
            })

            //control left click
            box.oncontextmenu = function(event){
                event.preventDefault();
                addFlag(box);
            }

        }


    //add numbers

    for(let i=0; i < board.length; i++){
        let total = 0;
        const leftEdge = i % width === 0;
        const rightEdge = i % width === width - 1;
        
        if(board[i].classList.contains('safe')){
            
            if(i > 0 && !leftEdge && board[i - 1].classList.contains('mine')) total++;
            if(i > 9 && !rightEdge && board[i + 1 - width].classList.contains('mine')) total++;
            if(i > 10 && board[i - width].classList.contains('mine')) total++;
            if(i > 11 && !leftEdge && board[i - 1 - width].classList.contains('mine')) total++;
            if(i < 98 && !rightEdge && board[i + 1].classList.contains('mine')) total++;
            if(i < 90 && !leftEdge && board[i - 1 + width].classList.contains('mine')) total++;
            if(i < 88 && !rightEdge && board[i + 1 + width].classList.contains('mine')) total++;
            if(i < 89 && board[i + width].classList.contains('mine')) total++;


            board[i].setAttribute('data', total);
            

        }
    }
}


    //click function

    function click(box){
        let cid = box.id;
        if(gameEnd) return;
        if(box.classList.contains('clicked') || box.classList.contains('flag')) return;
        if(box.classList.contains('mine')){
            gameOver(box);
        } else{
            let total = box.getAttribute('data');

            if(total != 0){
                box.classList.add('clicked');
                 if (total == 1) box.classList.add('one');
                 if (total == 2) box.classList.add('two');
                 if (total == 3) box.classList.add('three');
                 if (total == 4) box.classList.add('four');
                box.innerHTML = total;
                return;
            }
            
            checkbox(box, cid);
   
        }
        box.classList.add('clicked');

    }


    function checkbox(box, cid){
        const leftEdge = (cid % width === 0);
        const rightEdge = (cid % width === width - 1);

        setTimeout(() => {
            
            if(cid > 0 && !leftEdge){
                const nid = board[parseInt(cid) - 1].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid > 9 && !rightEdge){
                const nid = board[parseInt(cid) + 1 - width].id;
                const newbox = document.getElementById(nid);

                click(newbox);
            }

            if(cid > 10){
                const nid = board[parseInt(cid - width)].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid > 11 && !leftEdge){
                const nid = board[parseInt(cid) - 1 - width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid < 98 && !rightEdge){
                const nid = board[parseInt(cid) + 1].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 90 && !leftEdge){
                const nid = board[parseInt(cid) - 1 + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 88 && !rightEdge){
                const nid = board[parseInt(cid) + 1 + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 89){
                const nid = board[parseInt(cid) + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
        
        }, 50);

    }

    function gameOver(box){
        gameEnd = true;
    
    board.forEach(box => {
        if(box.classList.contains('mine')){
            box.style.backgroundColor = "#be3144";
            box.style.padding = "3px 0 0 4px";
            box.innerHTML = "<img src='Images/bomb.png'/>";
            box.classList.remove('mine');
            box.classList.add('clicked');
                        
        }
        document.getElementById("status").innerHTML = "Game Over!";
        document.querySelector(".pop-up").style.display = "block";
        document.querySelector(".pop-up").style.backgroundColor = "#222629";


    })

    
}    



function checkWin(){
    let matches = 0;

    for(let i=0 ;i<board.length; i++){
        if(board[i].classList.contains('flag') && board[i].classList.contains('mine')){
            matches++;
        }
        if(matches === numberOfMines){
            document.getElementById("status").innerHTML = "You Won!";
            document.querySelector(".pop-up").style.display = "block";
            document.querySelector(".pop-up").style.backgroundColor = "#1a73e8";
            gameEnd = true;

        }
    }
}

function newGame(){

        panel.innerHTML = '';
        gameEnd = false;
        shuffle = gameArray.sort(() => Math.random() - 0.5);
        board  = [];
        numberOfFlags = 0;
        document.getElementById('flags').innerHTML = 20;
        createBoard();
        
        
    }

    function addFlag(box){
        
        if(gameEnd) return;


            if(!box.classList.contains('clicked') && (numberOfFlags < numberOfMines)){

                if(!box.classList.contains('flag')){
                    box.classList.add('flag');
                    box.style.padding = "5px 0 0 4px";
                    box.innerHTML = "<img src='Images/flag.png'/>";
                    numberOfFlags++;
                    document.getElementById('flags').innerHTML = numberOfMines - numberOfFlags;
                    checkWin();

                }else{
                    box.classList.remove('flag');
                    box.style.padding = "8px";
                    box.innerHTML = '';
                    numberOfFlags--;
                    document.getElementById('flags').innerHTML = numberOfMines - numberOfFlags;

                }


            }
        }

         document.querySelector('.reset').addEventListener('click', function(){

            document.querySelector(".pop-up").style.display = "none";
            newGame();
        
    });

       document.getElementById("close").onclick = function(){

            document.querySelector(".pop-up").style.display = "none";

       }


document.getElementById('save').onclick = function(){
    if(!gameEnd){
        save();
    }else{
        document.getElementById("status").innerHTML = "Cannot save if the game is over!";
        document.querySelector(".pop-up").style.display = "block";
    }
}




function save(){


$.ajax({

    url: "/game",
    type: 'POST',
    contentType: 'application/json',
    data: saveGame(),
    success: function(response){
        console.log(response);
    }


    
})

}

document.getElementById('recreate').onclick = function(){
    
     rec();
     
     }



function rec(){
    $.ajax({
        url: '/game',
        type: 'GET',
        contentType: 'application/json',
        success: function(response){
            console.log('Success', response)
        }
    }).then((data) => {
    const d = JSON.parse(data);
    board = []
    panel.innerHTML = '';
    shuffle = d.shuffle_;
    Mines = Array(numberOfMines).fill('mine');
    emptyArray = Array(width * width - numberOfMines).fill('safe');
    gameArray = emptyArray.concat(Mines);
    createBoard();

    })
    
}

function saveGame(){
    
    let gameData = {
        shuffle_: shuffle
    }

    return JSON.stringify(gameData);
}

})

