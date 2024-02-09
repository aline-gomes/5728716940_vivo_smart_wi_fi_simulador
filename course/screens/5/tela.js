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
        gsap.from(e, 1, { autoAlpha: 0, delay: .25, onComplete: function () { gsap.set(telas[t], { clearProps: true }); } });
    }
}

function nextCard() {
    if ((t + 1) == telas.length) {
        setTimeout(() => { modulos.end(5); }, 1000);
        console.log('aqui acaba')
        return
    }

    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    fadeInGeral(telas[t])
}

function closeBalao(e) {
    let destaque = e.parentNode.nextElementSibling
    let hole = e.parentNode.previousElementSibling

    hole.parentNode.removeChild(hole)
    e.parentElement.parentElement.removeChild(e.parentElement)

    if (document.body.contains(destaque)) destaque.classList.add('pulse');
}