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
    let tl = gsap.timeline()
        .from('.p1', 1, { autoAlpha: 0, y: -30 })
        .from('.p2', 1, { autoAlpha: 0, y: -30 }, '.5');
}

function fadeInGeral(e) {
    e = e.children[0]
    gsap.from(e, 1, { autoAlpha: 0, delay: .25 })
}

function nextCard() {
    if ((t + 1) == telas.length) {
        modulos.end(114)
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    fadeInGeral(telas[t])
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
