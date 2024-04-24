const appName = "5букв"

let app = document.querySelector(".app")
let logo = app.querySelector(".logo")

let board = app.querySelector(".main__board")
let keyboard = app.querySelector(".keyboard")

let activeRow
let activeCell
let randomIndex
let word

let gameData = localStorage.getItem('wordle')
    ? JSON.parse(localStorage.wordle)
    : {
        darkTheme: false,
        gamesPlayed: 0,
        totalWins: 0,
        totalLooses: 0,
    }

// Цвет кнопки в модальном окне
let alertBtnColor = '#f1d314'


// Главный экран

// Настройка темы
function setDarkTheme() {
    document.documentElement.style.setProperty('--main-bg', '#2a2a38')
    document.documentElement.style.setProperty('--main-text', '#ffffff')
}

function setLightTheme() {
    document.documentElement.style.setProperty('--main-bg', '#ffffff')
    document.documentElement.style.setProperty('--main-text', '#000000')
}

// Создание главного экрана
function createApp() {
    if (gameData.darkTheme) {
        setDarkTheme()
    }
    // Создание логотипа
    for (let symbol of appName.split("")) {
        let tile = document.createElement("div")
        tile.classList.add('small-tile', 'bg-accent', 'color-accent')
        tile.textContent = symbol
        logo.appendChild(tile)
        document.querySelector("title").textContent = appName
    }

    // Создание клавиатуры
    keyboard.innerHTML = ''
    let keys = [
        'йцукенгшщзхъ',
        'фывапролджэ',
        '⌫ячсмитьбю✔'
    ]
    for (let line of keys) {
        let row = document.createElement('div')
        row.className = 'keyboard-row'
        for (let symbol of line.split("")) {
            let key = document.createElement("div")
            key.className = 'keyboard-tile'
            key.id = symbol.charCodeAt(0)
            key.textContent = symbol
            switch (key.id) {
                case '9003':
                    key.id = 'backspace'
                    key.textContent = ''
                    key.innerHTML = '<i class="las la-backspace"></i>'
                    break
                case '10004':
                    key.id = 'enter'
                    key.textContent = ''
                    key.innerHTML = '<i class="las la-check"></i>'
            }
            row.appendChild(key)
        }
        keyboard.appendChild(row)
    }

    // Обработка собитий

    // Ввод буквы
    document.addEventListener("click", function (e) {
        enterLetter(e)
    });

    // Удаление буквы - наэкранная клавиатура
    document.addEventListener('click', function (e) {
        if (e.target.id === "backspace" || e.target.parentElement.id === "backspace") {
            deleteLetter()
        }
    });

    // Удаление буквы - физическая клавиатура
    document.addEventListener('keyup', function (e) {
        if (e.key == "Backspace") {
            deleteLetter()
        }
    })

    // Создание новой игры
    startNewGame()
}

// Создание новой игры
function startNewGame() {
    // Выбираем случайное слово
    randomIndex = Math.floor(Math.random() * words.length)
    word = words[randomIndex]

    // Создание игрового поля
    board.innerHTML = ''
    for (let i = 1; i <= 6; i++) {
        let row = document.createElement("div")
        row.id = i
        row.className = "row"
        for (let j = 1; j <= 5; j++) {
            let cell = document.createElement("div")
            cell.id = `${i}-${j}`
            cell.classList.add('board-tile')
            row.appendChild(cell)
        }
        board.appendChild(row)
    }

    // Сброс стилей клавиатуры
    for (let item of document.querySelectorAll(".keyboard-tile")) {
        item.className = "keyboard-tile"
    }

    activeRow = document.getElementById("1");
    activeCell = document.getElementById("1-1");

    localStorage.wordle = JSON.stringify(gameData)
}

createApp();


// Ввод буквы
// Функция для наэкранной клавиатуры
function enterLetter(e) {
    let alphabetCodes = [...Array(32)].map((_, i) => String(i + 1072))
    if (alphabetCodes.includes(e.target.id)) {
        if (activeCell.textContent == "") {
            activeCell.textContent = e.target.textContent
            let cellId = activeCell.id.split("-")[1]
            if (cellId < activeRow.childNodes.length) {
                activeCell = document.getElementById(`${activeRow.id}-${++cellId}`)
            }
        }
        window.navigator.vibrate(100)
    }
}

// Коды клавиш физической клавиатуры
keys = {
    81: 'й',
    87: 'ц',
    69: 'у',
    82: 'к',
    84: 'е',
    89: 'н',
    85: 'г',
    73: 'ш',
    79: 'щ',
    80: 'з',
    219: 'х',
    221: 'ъ',
    65: 'ф',
    83: 'ы',
    68: 'в',
    70: 'а',
    71: 'п',
    72: 'р',
    74: 'о',
    75: 'л',
    76: 'д',
    59: 'ж',
    222: 'э',
    90: 'я',
    88: 'ч',
    67: 'с',
    86: 'м',
    66: 'и',
    78: 'т',
    77: 'ь',
    188: 'б',
    190: 'ю',
}
// Ввод буквы с физической клавиатуры
document.addEventListener('keyup', function (e) {
    if (keys[e.keyCode] != undefined) {
        if (activeCell.textContent == '') {
            activeCell.textContent = keys[e.keyCode]
            let cellId = activeCell.id.split("-")[1]
            if (cellId < activeRow.childNodes.length) {
                activeCell = document.getElementById(`${activeRow.id}-${++cellId}`)
            }
        }
    }
})

// Удаление буквы
function deleteLetter() {
    let cellId = activeCell.id.split("-")[1]
    if (cellId > 1 && activeCell.textContent == '') {
        activeCell = document.getElementById(`${activeRow.id}-${cellId - 1}`)
        activeCell.textContent = ''
    } else if ((cellId > 1 && activeCell.textContent != '')) {
        activeCell.textContent = ''
    }
}

// Проверка слова
function enterWord(e) {
    // Если введено 5 букв
    if (activeCell.id.split("-")[1] == "5") {
        let currentWord = ""
        for (let i = 1; i < 6; i++) {
            currentWord += document.getElementById(`${activeRow.id}-${i}`).textContent
        }
        // Проверка, есть ли введенное слово в словаре
        let flag = 0
        for (let item of words) {
            if (item.name == currentWord) {
                flag = 1
            }
        }
        if (flag == 0) {
            Swal.fire({
                icon: "warning",
                text: `Слова ${currentWord} нет в словаре!`,
                confirmButtonColor: alertBtnColor,
            })
            return
        }
        // Если введенное слово == загаданному
        if (currentWord == word.name) {
            Swal.fire({
                icon: "success",
                text: `Поздравляем!\n${word.name}\n${word.definition}`,
                preConfirm: startNewGame(),
                confirmButtonColor: alertBtnColor,
            })
        } else {
            // Если введенное слово != загаданному
            // Проверяем буквы на совпадения
            for (let i = 0; i < 5; i++) {
                if (currentWord[i] == word.name[i]) {
                    document.getElementById(`${activeRow.id}-${i + 1}`).classList.add("green-bg")
                    document.getElementById(currentWord[i].charCodeAt(0)).classList.add("green-bg")
                } else if (word.name.split("").includes(currentWord[i])) {
                    document.getElementById(`${activeRow.id}-${i + 1}`).classList.add("gray-bg")
                    document.getElementById(currentWord[i].charCodeAt(0)).classList.add("gray-bg")
                }
            }
            if (activeRow.id < 6) {
                // Анимация плиток в текущем ряду
                for (let i = 1; i < 6; i++) {
                    document.getElementById(`${activeRow.id}-${i}`).animate([{
                        transform: "rotate(0)",
                        transform: "rotate(360deg)"
                    }],
                        {
                            duration: 500,
                            iterations: 1,
                            delay: 100,

                        })
                }
                activeRow = document.getElementById(`${+activeRow.id + 1}`)
                activeCell = document.getElementById(`${activeRow.id}-1`)
            } else {
                Swal.fire({
                    icon: "error",
                    text: `Вы проиграли!\n${word.name}\n${word.definition}`,
                    preConfirm: startNewGame(),
                    confirmButtonColor: alertBtnColor,
                })
            }
        }
    } else {
        Swal.fire({
            text: "Введите слово из 5 букв",
            confirmButtonColor: alertBtnColor,
        })
    }
};

// Проверка слова - наэкранная клавиатура
document.addEventListener('click', function (e) {
    if (e.target.id === "enter" || e.target.parentElement.id === "enter") {
        enterWord(e)
    }
});

// Проверка слова физическая клавиатура (Нажатие клавиши Enter)
document.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        enterWord(e)
    }
})

