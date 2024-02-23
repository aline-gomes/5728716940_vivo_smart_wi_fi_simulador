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

    showTimeoutScreens()

    let tl = gsap.timeline({ defaults: { clearProps: true } })
    tl
        .from('.p1', 1, { autoAlpha: 0 })
        .from('.p2', 1, { autoAlpha: 0, y: -30 }, '.5');
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
        modulos.end(116)
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    subscreen = t
    sco.setSupend()
    fadeInGeral(telas[t])
    showTimeoutScreens()
}

function showTimeoutScreens() {
    if (t == 6) {
        setTimeout(() => { nextCard(); }, 3000);
    }

    else if (t == 14) {
        setTimeout(() => {
            let x = telas[t]
            gsap.to(x, 2, { autoAlpha: 0, onComplete: function () { nextCard() }, })
        }, 2000);
    }
}

function closeBalao(e) {
    let destaque = e.parentNode.parentNode.nextElementSibling
    e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)

    if (t === 3) {
        setTimeout(() => { nextCard(); }, 3000);
        return;
    }
    destaque.classList.add('pulse');
}