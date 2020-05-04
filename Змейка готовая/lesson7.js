// Глобальные переменные:                            
const FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var PROBLEM_SPEED = 5000;
var snake = []; // Сама змейка
var direction = 'y+';
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат
var val = 0;



function init() {
    prepareGameField();// Генерация поля поле запуска функции которая сделала таблицу
    var counter = document.getElementById("counter");
        counter.innerHTML = score;
        counter.style.fontSize = "40px";

    var wrap = document.getElementsByClassName('wrap')[0];//основной блок присваеваем переменную
    // Подгоняем размер контейнера под игровое поле

    wrap.style.width = '400px';// задаем ширину основного блока
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);//кнопка запускает функцию
    document.getElementById('snake-renew').addEventListener('click', refreshGame);//кнопка запускает функцию
   
        

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);// запускается функция управления клавиатурой
    
}



/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');//cоздаем поле для таблици
    game_table.setAttribute('class', 'game-table ');//присваеваем два класса полю

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');// присваеваем тег строке
        row.className = 'game-table-row row-' + i;// cоздаем класс строке

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');//присваеваем тег ячейки
            cell.className = 'game-table-cell cell-' + i + '-' + j;//создаем класс этой ячейки
                                                     //присваеваем номер ячейки

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление ячейки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    setTimeout(createFood, 5000);//создание еды раз в пять секунд
    val_timer = setInterval(createVal, PROBLEM_SPEED)

}


/**
 Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y-1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

/**
 Движение змейки
 */
function move() {
   
    var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');
    console.log(snake.length);
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);
      
     if (coord_y == 0 && direction == 'y+') {
    coord_y = 20;
        teleport ();
    } 

    else if (coord_x == 0 && direction == 'x-') {
        coord_x = 20;
        teleport ();
    }

    else if (coord_x == 19 && direction == 'x+') {
        coord_x = -1;
       teleport ();
    } 
     else  if (coord_y == 19 && direction == 'y-') {
        coord_y = -1;
          teleport ();
    } 

    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }


// воткнулся в препятствие

 

    if (!isSnakeUnit(new_unit) && !haveVal(new_unit) ) {
     
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);
   

	   if (!haveFood(new_unit)) {
      
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');

            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
   
    
    }
    else {
        finishTheGame();
    }

} 

    function teleport() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');
    //отнимается хвос и остается голова классы преобразуются в массив

    // Сдвиг головы
    var new_unit;//новая ячейка куда переместиться голова
    var snake_coords = snake_head_classes[1].split('-');//обращаемся к координатам головы 
    var coord_y = parseInt(snake_coords[1]);// x и y заносяться в переменные
    var coord_x = parseInt(snake_coords[2]);
    
    
     
        
   
    // Определяем новую точку
    if (direction == 'x-') {//влема
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {//вправо
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {//вверх
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {//вниз
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }
    
   
   
}
//        
     

 //Проверка на змейку

 
function isSnakeUnit(unit) {//проверка, что змейка не попала сама в себя в новой ячейке
    var check = false;//если фолс значет змея не ела сому себя

    if (snake.includes(unit)) {//если в змейке содержится новая ячейка, значит возникло пересечение
        check = true;          // include проверяет наличия текста unit
    }
    return check;//реторн сохранят результат
}
/**

 проверка на еду

 */
function haveFood(unit) {//увеличиваются размеры зммейки при съедании корма
    var check = false; //змейка не съела себя

    var unit_classes = unit.getAttribute('class').split(' ');//класс делиться на массив

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();//создается следующий корм через функцию
     
        score++;
        var counter = document.getElementById("counter");
        counter.innerHTML = score;
        counter.style.fontSize = "40px";
        
    }
    
    
            
    return check;
}

function haveVal(val) {//увеличиваются размеры зммейки при съедании корма
    var check = false; //змейка не съела себя

    var val_classes = val.getAttribute('class').split(' ');//класс делиться на массив

    // Если еда
    if (val_classes.includes('food_val')) {
        check = true;  
        
    }
   
    
            
    return check;
}

/**
 Создание еды
 */
function createFood() {
    createVal()
    var foodCreated = false;//функция говорит что корм пока не создан
     

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);//генерируется случайное расположение еды
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        
        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {//проверка нужна чтобы еда не попала в тело змейки сразу
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;//cоздание нового корма
        }
    }
    
     
         
      }
function createVal() {
     
     var ValCreated = false;//функция говорит что препятствия пока не создано  
     while (!ValCreated){
        
         
        var val_x = Math.floor(Math.random() * FIELD_SIZE_X );
        var val_y = Math.floor(Math.random() * FIELD_SIZE_Y );
         
        var val_cell = document.getElementsByClassName('cell-' + val_y + '-' + val_x)[0];
        var val_cell_classes = val_cell.getAttribute('class').split(' ');
         
         if (!val_cell_classes.includes('snake-unit')) {//проверка нужна чтобы еда не попала в тело змейки сразу
            var classestwo = '';
            for (var i = 0; i < val_cell_classes.length; i++) {
                classestwo += val_cell_classes[i] + ' ';
               
            }
         
        val_cell.setAttribute('class', classestwo + 'food_val');
        ValCreated = true;//cоздание нового корма
             
            
        
     }     
        
     }
    
     }

 function valunit(){
 if(snake-unit==food_val){
             finishTheGame();
         }
}

 //Изменение направления движения змейки

function changeDirection(e) {
    console.log(e.keyCode);
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
    
}

/**
 Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;