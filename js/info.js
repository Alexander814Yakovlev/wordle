// Инфо (подключать после главного файла!)
let info = document.querySelector(".info")
let infoButton = app.querySelector(".info-btn")
let returnInfoButton = info.querySelector(".return-btn")

infoButton.onclick = function() {
    app.style.display = 'none'
    info.style.display = 'flex'
    navigator.vibrate(keyVibrateTime)
}

returnInfoButton.onclick = function() {
    app.style.display = 'flex'
    info.style.display = 'none'
    navigator.vibrate(keyVibrateTime)
}