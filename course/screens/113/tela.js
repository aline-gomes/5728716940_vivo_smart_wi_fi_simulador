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
    let mascara_balao = document.querySelector('.mascara_balao')

    if (document.body.contains(mascara_balao)) {

        let tl = gsap.timeline({ defaults: { clearProps: true } })
        tl
            .from(mascara_balao, .8, { autoAlpha: 0 })
            .from('.hole', .5, { autoAlpha: 0 })
            .from('.balao', .5, { autoAlpha: 0 });
    }
    else {
        gsap.from(e, 1, { autoAlpha: 0, delay: .25 })
    }
}

function nextCard() {
    if ((t + 1) == telas.length) {
        modulos.end(113)
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    fadeInGeral(telas[t])
}

function closeBalao(e) {
    e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)
    let y = telas[t].querySelector('.pulse')
    if (y) {
        y.style.display = 'block'
    }
}