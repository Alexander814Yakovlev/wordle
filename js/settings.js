// Настройки (подключать после главного файла!)
let settings = document.querySelector(".settings")

let settingsButton = app.querySelector(".settings-btn")
let returnButton = settings.querySelector(".return-btn")

let themeSwitch = settings.querySelector("#app__theme")
themeSwitch.checked = localStorage.getItem("wordle") ? JSON.parse(localStorage.wordle).darkTheme : false

settingsButton.onclick = function () {
    settings.style.display = 'flex'
    app.style.display = 'none'
}

returnButton.onclick = function () {
    settings.style.display = 'none'
    app.style.display = 'flex'
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