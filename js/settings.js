// Настройки (подключать после главного файла!)
let settings = document.querySelector(".settings")
settings.style.display = 'none'

let settingsButton = app.querySelector(".settings-btn")
let returnButton = settings.querySelector(".return-btn")

let themeSwitch = settings.querySelector("#app__theme")
themeSwitch.checked = localStorage.getItem("wordle") ? JSON.parse(localStorage.wordle).darkTheme : false

let vibrationSwitch = settings.querySelector("#app__vibration")
vibrationSwitch.checked = localStorage.getItem("wordle") ? JSON.parse(localStorage.wordle).vibration : gameData.vibration

settingsButton.onclick = function () {
    settings.style.display = 'flex'
    app.style.display = 'none'
    navigator.vibrate(keyVibrateTime)
}

returnButton.onclick = function () {
    settings.style.display = 'none'
    app.style.display = 'flex'
    navigator.vibrate(keyVibrateTime)
}

themeSwitch.onchange = function (e) {
    if (e.target.checked) {
        setDarkTheme()
        gameData.darkTheme = true
    } else {
        setLightTheme()
        gameData.darkTheme = false
    }
    localStorage.wordle = JSON.stringify(gameData)
}

vibrationSwitch.onchange = function (e) {
    if (e.target.checked) {
        keyVibrateTime = 80
        gameData.vibration = true
    } else {
        keyVibrateTime = 0
        gameData.vibration = false
    }
    localStorage.wordle = JSON.stringify(gameData)
}