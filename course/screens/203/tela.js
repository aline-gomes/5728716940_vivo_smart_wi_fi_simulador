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
}

function nextCard() {
    if ((t + 1) == telas.length) {
        console.log('aqui acaba')
        screen.next()
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    if (t == 14) {
        setTimeout(() => {
            let x = telas[t]
            gsap.to(x, 2, { autoAlpha: 0, onComplete: function(){ nextCard() }, })
        }, 2000);
    }
}

function closeBalao(e) {
    e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)
    let y = telas[t].querySelector('.pulse')
    if (y) {
        y.style.display = 'block'
    }
}