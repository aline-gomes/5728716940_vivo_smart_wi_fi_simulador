//Para abrir em outro card só trocar o t
var t = 1, 
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
    if ((t + 1) == telas.length){
        console.log('aqui acaba')
        return
    }
    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'
}

function closeBalao(e){
    e.parentElement.parentElement.removeChild(e.parentElement)
}