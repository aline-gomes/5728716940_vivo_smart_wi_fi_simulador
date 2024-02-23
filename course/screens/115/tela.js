//Para abrir em outro card só trocar o t
var t = 0,
    telas = 0

function init() {
    subscreen !== null ? t = subscreen : subscreen = 0;
    sco.setSupend();

    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })

    showTimeoutScreen()

    let tl = gsap.timeline({ defaults: { clearProps: true } })
        .from('.p1', 1, { autoAlpha: 0 })
        .from('.p2', 1, { autoAlpha: 0, x: '-50%', y: -30 }, '.5');
}

var mascara_balao = null

function fadeInGeral(e) {
    e = e.children[0]

    if (mascara_balao !== null) {
        mascara_balao = document.querySelector(`.${e.parentNode.className} .mascara_balao`)
        let tl = gsap.timeline({ defaults: { clearProps: true } })
        tl
            .from(mascara_balao, .8, { autoAlpha: 0 })
            .from('.hole', .5, { autoAlpha: 0 })
            .from('.balao', .5, { autoAlpha: 0 });
    }
    else {
        gsap.from(e, 1, { autoAlpha: 0, delay: .25, onComplete: function () { gsap.set(telas[t], { clearProps: true }); } });
    }
}

function nextCard() {
    if ((t + 1) == telas.length) {
        modulos.end(115)
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    subscreen = t
    sco.setSupend()
    showTimeoutScreen()
    fadeInGeral(telas[t])
}

function showTimeoutScreen() {
    if (t == 1) {
        setTimeout(() => { nextSl(); }, 3000);
        return;
    }
}

function nextSl() {
    document.querySelector('.s2 .foco').style.cssText = 'display: none'
    document.querySelector('.s2').querySelector('img').style.cssText = ''
    document.querySelector('.s2').style.cssText = 'background-image: url(./screens/115/img/103.png)'
}