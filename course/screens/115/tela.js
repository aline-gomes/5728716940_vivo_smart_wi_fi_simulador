//Para abrir em outro card só trocar o t
var t = 0,
    telas = 0

function init() {
    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })
    let tl = gsap.timeline({ defaults: { clearProps: true } })
        .from('.p1', 1, { autoAlpha: 0 })
        .from('.p2', 1, { autoAlpha: 0, y: -30 }, '.5');
}

function fadeInGeral(e) {
    e = e.children[0]
    gsap.from(e, 1, { autoAlpha: 0, delay: .25 })
}
function nextCard() {
    if ((t + 1) == telas.length) {
        modulos.end(115)
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    fadeInGeral(telas[t])
}

function nextSl(e) {
    e.style.cssText = 'display: none'
    document.querySelector('.s2').querySelector('img').style.cssText = ''
}