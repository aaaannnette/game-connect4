// Создание игрового поля

var table = document.createElement('table'), tr, td, row, cell;
var gamers = ['gamer-red', 'gamer-yellow'];
var gamerNum = 0;

                    
tr = document.createElement('tr');
for (cell = 0; cell < 7; cell++) {
    str = '<svg><circle class="circle-top" r="37" cy="40" cx="40"/>';
    td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = str + "</svg>";
}
table.appendChild(tr);
document.getElementById('table').appendChild(table);
                
var table = document.createElement('table'), tr, td, row, cell;
for (row = 0; row < 6; row++) {
    tr = document.createElement('tr');
    for (cell = 0; cell < 7; cell++) {
        str = '<svg> <rect y="0" x="0"/> <circle class="circle" r="37" cy="40" cx="40"/>';
        td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = str + "</svg>";

    }
    table.appendChild(tr);
}
document.getElementById('table').appendChild(table);

// Проверка на непустое значение имен игроков

var name1=document.getElementById("name_gamer1");
var name2=document.getElementById("name_gamer2");
var button_play=document.getElementById("but_play");
 
 
button_play.onclick=function() {
    if (name1.value === null || name1.value === "" || name2.value === null || name2.value === "") {
        alert("Enter your name or names!");
    }
    
    else {
        alert("The game starts! Good luck!");
    }
}; 


//заливка цветом

var el = document.getElementsByClassName('circle');

for (var i = 0; i < el.length; i++) {
    el[i].addEventListener('click', cellClickHandler); 
}

function cellClickHandler () {
    this.classList.toggle(gamers[gamerNum]);
	this.removeEventListener('click', cellClickHandler);
	
	// isWin(gamers, lines);
	
    gamerNum++;
    if (gamerNum == gamers.length) {
        gamerNum = 0;
    }
}





	
