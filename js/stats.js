const winIcon = '<i class="las la-trophy"></i>'
const percentIcon = '<i class="las la-percent"></i>'
const looseIcon = '<i class="las la-thumbs-down"></i>'
const totalIcon = '<i class="las la-gamepad"></i>'


let stats = document.querySelector(".stats")
let statsButton = app.querySelector(".stats-btn")
let returnStatsButton = stats.querySelector(".return-btn")
let statsInfo = stats.querySelector(".stats__info")

statsButton.onclick = function () {
    stats.style.display = 'flex'
    app.style.display = 'none'
    showStatistics()
    navigator.vibrate(keyVibrateTime)
}

returnStatsButton.onclick = function () {
    app.style.display = 'flex'
    stats.style.display = 'none'
    statsInfo.innerHTML = ''
    navigator.vibrate(keyVibrateTime)
}

function showStatistics() {
    let myStats = {
        win: [gameData.totalWins, 'Побед:', winIcon],
        loose: [gameData.totalLooses, 'Проигрышей:', looseIcon],
        percent: [gameData.winPercent, 'Процент побед:', percentIcon],
        total: [gameData.gamesPlayed, 'Всего сыграно:', totalIcon],
    }
    for (item in myStats) {
        let statsTile = document.createElement('div')
        statsTile.className = "stats__tile"

        let tileIcon = document.createElement('div')
        tileIcon.className = 'stats__tile_icon'
        tileIcon.innerHTML = myStats[item][2]
        statsTile.appendChild(tileIcon)
        let tileTitle = document.createElement('div')
        tileTitle.className = 'stats__tile_title'
        tileTitle.innerHTML = myStats[item][1]
        statsTile.appendChild(tileTitle)
        let tileInfo = document.createElement('div')
        tileInfo.className = 'stats__tile_info'
        tileInfo.innerHTML = myStats[item][0]
        statsTile.appendChild(tileInfo)

        statsInfo.appendChild(statsTile)
    }
}