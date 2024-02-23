//Para abrir em outro card só trocar o t
var t = 0,
    telas = 0,
    btn_screen_1_anim

function init() {
    subscreen !== null ? t = subscreen : subscreen = 0;
    sco.setSupend();

    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })
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
        setTimeout(() => { modulos.end(4); }, 1000);
        console.log('aqui acaba')
        return
    }

    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    subscreen = t
    sco.setSupend()
    fadeInGeral(telas[t])
}

function closeBalao(e) {
    let destaque = e.parentNode.parentNode.nextElementSibling
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)

    if (t == 1) {
        btn_screen_1_anim = gsap.to(destaque, { scale: 1.25, duration: 1.2, stagger: { repeat: -1 } });
        return;
    }

    if (document.body.contains(destaque)) destaque.classList.add('pulse')
}