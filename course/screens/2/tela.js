//Para abrir em outro card só trocar o t
var t = 0, telas = 0
var elements = document.querySelectorAll('.anim');
var user_number = document.querySelector(".user_number");
var mascara_balao = document.querySelector(".mascara_balao");

function init() {
    Anim();
    user_number.style.display = 'none'
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
        return;
    }

    telas[t].style.display = 'none'
    t++
    telas[t].style.display = 'block'

    gsap.from(telas[t], .5, { autoAlpha: 0, onComplete: function () { gsap.set(telas[t], { clearProps: true }); } });

    if (t == 1 || t == 7 || t == 16 || t == 19) {
        setTimeout(() => { nextCard(); }, 3000);
        return;
    }

    if (t == 8 || t == 11 || t == 13) showInputs();
}

user_number.addEventListener("focus", e => {
    e.target.value = "";
})

var inputResp = ['00000000000', '000000', '123456'];

function onInput(index, max_length) {
    let number = user_number.value.replace(/\s/g, '');
    user_number.value = number;

    let result = /^\d+$/.test(number);

    if (!result || number !== inputResp[index] && number.length == max_length) {
        document.querySelector('.feedback').style.display = 'flex'
        user_number.value = '';
    } else {
        if (number === inputResp[index]) {
            console.log('deu certo!')
            user_number.classList.add('lock')

            if (t == 11) {
                setTimeout(() => { hideInput(); nextCard(); }, 200);
                return;
            }
            nextCard();
        }
    }
}

var showInputs = _ => {
    let pop_text = document.querySelector('.balao p');

    user_number.value = 'Número';
    user_number.className = 'user_number abs lock'

    mascara_balao.style.cssText = ''
    user_number.oninput = () => { };

    switch (true) {
        case (t == 8):
            user_number.style.cssText = 'display: block; border: 5px dashed #609;'
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 00000000000.</p>'
            user_number.oninput = () => { onInput(0, 11); };
            break;

        case (t == 11):
            user_number.value = '';
            user_number.style.cssText = 'display: block; border: 5px dashed #609; top: 26%; left: 51.3%; width: 27rem; padding: 0.5rem; letter-spacing: 3.8rem;'
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 000000.</p>'
            user_number.oninput = () => { onInput(1, 6); };
            break;

        case (t == 13):
            user_number.style.cssText = 'display: block; border: 5px dashed #609; top: 20%; padding: 0;'
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 123456.</p>'
            user_number.oninput = () => { onInput(2, 6); };
            break;
    }
}

function hideInput() {
    user_number.style.cssText = 'display: none;'
}

function closeFeedBack(element) {
    element.parentElement.style.cssText = 'display: none;'
}

function openLastMask() {
    mascara_balao.style.display = 'block'

    document.querySelector('.seta').style.display = 'none'
    document.querySelector('.hole').style.display = 'none'
    document.querySelector('.balao p').innerHTML = '<strong>Pronto!</strong><br> Você está na tela inicial do App Vivo Smart Wi-Fi.'

    document.querySelector('.balao .fechar').onclick = _ => { nextCard(); };
}

function closeBalao(element) {
    if (t == 8 || t == 11 || t == 13) {
        user_number.classList.remove('lock');
        user_number.style.border = 'none'
    }
    element.parentElement.parentElement.style.cssText = 'display: none;'
}

// ANIMATION
function Anim() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.cssText = 'opacity: 0;';
    }

    setTimeout(() => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.cssText = '';

            gsap.from(elements[i], .4, {
                autoAlpha: 0, x: '-15%', ease: Back.easeOut.config(3.5), delay: (0.2 * i), onComplete: function () {
                    gsap.set(elements[i], { clearProps: true });
                }
            });
        }
    }, 200);
}