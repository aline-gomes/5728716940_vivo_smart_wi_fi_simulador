//Para abrir em outro card só trocar o t
var t = 0,
    telas = 0,
    inputText = document.querySelector('.s8 input')

function init() {
    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })

    inputText.addEventListener("input", onInput);
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
        modulos.end(3)
        console.log('aqui acaba')
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
    fadeInGeral(telas[t])
}

inputText.addEventListener("focus", e => {
    e.target.value = "";
})

var inputResp = 'Cleber';

function onInput(e) {
    let name = e.target.value.toLowerCase().replace(/^./, str => str.toUpperCase())
    e.target.value = name;

    let isNumber = /^\d+$/.test(name);

    if (isNumber || name !== inputResp && name.length == 6) {
        document.querySelector('.feedback').style.display = 'flex'
        e.target.value = '';
    } else {
        if (name === inputResp) {
            console.log('Correto!')
            e.target.classList.add('lock')
            document.querySelector('#foco_1').className = 'divImg foco pulse'
        }
    }
}

function checkDevice(element) {
    element.style.cssText = 'display: none;'

    element.nextElementSibling.classList.add('lock')
    element.nextElementSibling.style.cssText = 'display: block;'

    setTimeout(() => { nextCard(); }, 500);
}

function closeFeedBack(element) {
    element.parentElement.style.cssText = 'display: none;'
}

function closeBalao(e) {
    let destaque = e.parentNode.parentNode.nextElementSibling
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)
    if (t !== 7) destaque.classList.add('pulse');
}