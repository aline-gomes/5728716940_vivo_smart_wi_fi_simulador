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

function nextCard() {
    if ((t + 1) == telas.length) {
        screen.goto(1)
        console.log('aqui acaba')
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    gsap.from(telas[t], .5, { autoAlpha: 0, onComplete: function () { gsap.set(telas[t], { clearProps: true }); } });

    if (t == 7) {
        setTimeout(() => {
            document.querySelector('#foco_1').remove()
            document.querySelector('#foco_2').style.display = 'block'
        }, 3000);
    }
}

function closeBalao(e) {
    let destaque = e.parentNode.nextElementSibling
    let hole = e.parentNode.previousElementSibling

    hole.parentNode.removeChild(hole)
    e.parentElement.parentElement.removeChild(e.parentElement)

    destaque.style.display = 'block'
}