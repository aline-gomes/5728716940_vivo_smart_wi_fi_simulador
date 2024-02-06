//Para abrir em outro card só trocar o t
let t = 0,
    telas = 0

function init() {
    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })
}

function nextCard() {
    if ((t + 1) == telas.length) {
        console.log('aqui acaba')
        screen.next()
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    if (t == 4 || t == 11) {
        skip()
    }
}

function closeBalao(e) {
    e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)
    let y = telas[t].querySelector('.pulse')
    if (y) {
        y.style.display = 'block'
    }
}

function skip() {
    setTimeout(() => {
        nextCard()
    }, 3000)
}
