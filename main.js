// Создание игрового поля

// var table = document.createElement('table'), tr, td, cell, row;
let row, cell;
let gamers = ['gamer-red', 'gamer-yellow'];
let gamerNum = 0;
let game = document.querySelector('#table');
let field = document.querySelector('.table');

let rows = fillField (field); 
let cols = getColumns(rows);

function fillField (field) {
    var rows = []; 
    tr = document.createElement('tr');
	//вверхнее отображение в табл  
    // for (cell = 0; cell < 7; cell++) {
    //     str = '<svg><circle class="circle-top"  r="37" cy="40" cx="41"/>';
    //     td = document.createElement('td');
    //     tr.appendChild(td);
    //     td.innerHTML = str + "</svg>";
    // }
    // field.appendChild(tr);

    for (row = 0; row < 6; row++) {
        var tr = document.createElement('tr');
        rows[row] = [];

        for (cell = 0; cell < 7; cell++) {
            str = '<svg> <rect y="0" x="0"/> <circle class="circle" r="37" cy="40" cx="40" />';
            var td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = str + "</svg>";
			td.addEventListener('click', cellClickHandler1);
            rows[row][cell] = td;
        }
        field.appendChild(tr);
    }
    return rows;
}

console.log (rows);
// console.log (cols);

// Разблокировка игрового поля после нажатия на play

let name1 = document.getElementById("name_gamer1");
let name2 = document.getElementById("name_gamer2");
let button_play = document.getElementById("but_play");
 
button_play.onclick = function() {
	let table = document.getElementById('table');
	table.style.pointerEvents = 'auto';
	alert ('The game has begun! Good luck!');
}

//заливка цветом

let el = document.getElementsByClassName('circle');

for (var i = 0; i < el.length; i++) {
    el[i].addEventListener('click', cellClickHandler);
}

function cellClickHandler () {
    this.classList.toggle('circle');
    this.classList.toggle(gamers[gamerNum]);
	this.removeEventListener('click', cellClickHandler);
	
    gamerNum++;
    if (gamerNum == gamers.length) {
        gamerNum = 0;
    }
}

//отображение сверху фишки при навидении



//добавление класса для td, чтобы определить победителя 

let gamers1 = ['red', 'yellow'];
let gamerNum1 = 0;

function cellClickHandler1 () {
	this.classList.toggle(gamers1[gamerNum1]);
	this.removeEventListener('click', cellClickHandler1);
	
	isWin(gamers1, lines);
	if(noMoves()) {
		alert ('Sorry, no more moves... start the game again!');
	}
	
    gamerNum1++;
    if (gamerNum1 == gamers1.length) {
        gamerNum1 = 0;
    }
}

// проверка на то, что ходы еще есть

function noMoves () {
	var hasMoves = true;
	rows.forEach(rowLocal => {
		rowLocal.forEach(element => {
			if (element.className == ""){
				hasMoves = false;
			}
		});
	});
	return hasMoves;
}

//объявление победителя и обновление страницы

function endGame(gamer) {
	alert('The player won - '+ gamer + ' !');
	location.reload();
}

//выявление победителя

let diag1 = getFirstDiags(rows);
let diag2 = getSecondDiags(rows);
let lines = rows.concat(cols, diag1, diag2);

function isWin(gamers, lines) {
	for (var i = 0; i < gamers.length; i++) {
		if (checkWin(gamers[i], lines)) {
			endGame(gamers[i]);
			break;
		}
	}
}

function checkWin(gamer, lines) {
	for (var i = 0; i < lines.length; i++) {
		for (var j = 3; j < lines[i].length; j++) {
			if (
				lines[i][j - 3].classList.contains(gamer) &&
				lines[i][j - 2].classList.contains(gamer) &&
				lines[i][j - 1].classList.contains(gamer) &&
				lines[i][j].classList.contains(gamer)
				) {
					return true;
			}
		}
	}
	return false;
}

function getColumns(arr) {
	var result = [];
	
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (result[j] === undefined) {
				result[j] = [];
			}
			
			result[j][i] = arr[i][j];
		}
	}
	
	return result;
}

function getFirstDiags(arr) {
	var result = [];

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (result[i + j] === undefined) {
				result[i + j] = [];
			}
			
			result[i + j].push(arr[i][j]);
		}
	}
	
	return result;
}

function getSecondDiags(arr) {
	return getFirstDiags(reverseSubArrs(arr));
}

function reverseSubArrs(arr) {
	var result = [];
	
	for (var i = 0; i < arr.length; i++) {
		for (var j = arr[i].length - 1; j >= 0; j--) {
			if (result[i] === undefined) {
				result[i] = [];
			}
			
			result[i].push(arr[i][j]);
		}
	}
	
	return result;
}
