// Создание игрового поля

let row, cell;
let gamers = ['gamer-red', 'gamer-yellow'];
let gamerNum = 0;
let game = document.querySelector('#table');
let field = document.querySelector('.table');

let rows = fillField(field);
let cols = getColumns(rows);

function fillField(field) {
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

// console.log (rows);
console.log(cols);

// Разблокировка игрового поля после нажатия на play

let button_play = document.getElementById("but_play");

button_play.onclick = function () {
	let table = document.getElementById('table');
	table.style.pointerEvents = 'auto';
}

//отображение сверху фишки при навидении

// Заливка цветом
// Добавление класса для td, чтобы определить победителя 

let gamers1 = ['red', 'yellow'];

function cellClickHandler1() {
	var column = -1;
	rows.forEach(row => {
		column = column == -1 ? row.indexOf(this) : column;
	});

	var bool = true;
	for (var i = rows.length - 1; i >= 0; i--) {
		if (rows[i][column].className == "" && bool) {
			rows[i][column].classList.toggle(gamers1[gamerNum]);
			rows[i][column].removeEventListener('click', cellClickHandler1);

			rows[i][column].children[0].children[1].classList.toggle('circle');
			rows[i][column].children[0].children[1].classList.toggle(gamers[gamerNum]);

			bool = false;
		}
	}

	isWin(gamers1, lines);

	if (noMoves()) {
		alert('Sorry, no more moves... start the game again!');
		location.reload();
	}

	gamerNum++;
	if (gamerNum == gamers.length) {
		gamerNum = 0;
	}
}

// Проверка на то, что ходы еще есть

function noMoves() {
	var hasMoves = true;
	rows.forEach(rowLocal => {
		rowLocal.forEach(element => {
			if (element.className == "") {
				hasMoves = false;
			}
		});
	});
	return hasMoves;
}

//Объявление победителя и обновление страницы

function endGame(gamer) {
	alert('The player won - ' + gamer + ' !');
	location.reload();
}

//Выявление победителя

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
