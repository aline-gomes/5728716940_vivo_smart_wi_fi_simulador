//Para abrir em outro card só trocar o t
var t = 0,
    telas = 0,
    btn_screen_4_anim,
    inputText = document.querySelector('.s8 input')

function init() {
    subscreen !== null ? t = subscreen : subscreen = 0;
    sco.setSupend();

    telas = document.querySelectorAll('section')
    telas.forEach((e, index) => {
        if (index == t)
            return
        e.style.display = 'none'
    })

    inputText.addEventListener("input", onInput);
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
        modulos.end(3)
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

inputText.addEventListener("focus", e => {
    e.target.value = "";
})

var isNumber, inputName;

function onInput(e) {
    inputName = e.target.value.toLowerCase().replace(/^./, str => str.toUpperCase())
    e.target.value = inputName;

    isNumber = /^\d+$/.test(inputName);

    if (inputName.length > 2) {
        document.querySelector('#foco_1').className = 'divImg foco pulse';
    }
}

var inputResp = 'Cleber';

function checkInputResp(element) {
    if (isNumber || inputName !== inputResp) {
        document.querySelector('.feedback').style.display = 'flex'
        inputText.value = '';
    } else {
        if (inputName === inputResp) {
            console.log('Correto!')
            inputText.classList.add('lock')

            element.style.cssText = 'display: none;'
            element.nextElementSibling.classList.add('lock')
            element.nextElementSibling.style.cssText = 'display: block;'

            setTimeout(() => { nextCard(); }, 500);
        }
    }
}

function closeFeedBack(element) {
    element.parentElement.style.cssText = 'display: none;'
}

function closeBalao(e) {
    let destaque = e.parentNode.parentNode.nextElementSibling
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)

    if (t == 4) {
        btn_screen_4_anim = gsap.to(destaque, { scale: 1.25, duration: 1.2, stagger: { repeat: -1 } });
    }
    else if (t !== 7) {
        destaque.classList.add('pulse');
    }
}