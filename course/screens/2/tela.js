var t = 0, telas = 17
var btn = document.querySelector('.destaque');
var elements = document.querySelectorAll('.anim');
var destaque = document.querySelector('.destaque');
var user_number = document.querySelector(".user_number");
var mascara_balao = document.querySelector(".mascara_balao");

function init() {
    Anim();
    user_number.style.display = 'none'
    document.querySelector('section').style.display = 'none'
}

function nextCard() {
    if (t == telas) {
        document.querySelector('.prints_modulo_1').id = `container_print_${t}`

        mascara_balao.style.cssText = ''
        destaque.style.cssText = 'display: none;'
        document.querySelector('.balao p').innerHTML = '<strong>Pronto!</strong><br> Você está na tela inicial do App Vivo Smart Wi-Fi.'

        document.querySelector('.seta').style.display = 'none'
        document.querySelector('.hole').style.display = 'none'
        document.querySelector('.balao .fechar').onclick = _ => { screen.goto(1); };

        console.log('aqui acaba')
        return;
    }

    btn.id = `d${t}`
    t++

    if (t == 6 || t == 13 || t == 16) {
        btn.parentNode.style.cssText = `background-image: url(./screens/2/img/print_${t}.gif);`
        setTimeout(() => { nextCard(); }, 3000);
        return;
    }

    if (t == 7 || t == 9 || t == 11) showInputs();
    btn.parentNode.style.cssText = `background-image: url(./screens/2/img/print_${t}.png);`
}

var load_fake = document.querySelector('.load_fake');

const showLoadFake = (element) => {
    load_fake.style.cssText = 'display: block;'
    element.parentNode.style.cssText = 'background-image: none;'

    setTimeout(() => {
        load_fake.style.cssText = 'display: none;'
        document.querySelector('#btn_vivinho').style.display = 'none'
        nextCard()
    }, 3000);
}

user_number.addEventListener("focus", e => {
    e.target.value = "";
    destaque.classList.remove('pulse')
})

var inputResp = ['00000000000', '000000', '123456'];

function onInput(index, max_length) {
    let number = user_number.value.replace(/\s/g, '');
    user_number.value = number;

    let result = /^\d+$/.test(number);
    destaque.style.cssText = 'border: none;'

    if (!result || number !== inputResp[index] && number.length == max_length) {
        document.querySelector('.feedback').style.display = 'flex'
        user_number.value = '';
    } else {
        if (number === inputResp[index]) {
            console.log('deu certo!')
            if (index == 0) btn.parentNode.style.cssText = 'background-image: url(./screens/2/img/print_7_2.png);'
            user_number.classList.add('lock')
            nextDestaque(index)
        }
    }
}

var nextDestaque = (index) => {
    if (index == 1) {
        nextCard();
        user_number.style.cssText = 'display: none;'
        destaque.className = 'destaque abs pulse'
        destaque.style.cssText = ''
        return;
    }

    var divBtn = document.createElement('div');
    (t == 7) ? divBtn.id = 'd6_2' : divBtn.id = 'd10_2';
    divBtn.className = 'destaque abs pulse'
    document.querySelector('.prints_modulo_1').appendChild(divBtn);

    divBtn.onclick = _ => {
        user_number.style.cssText = 'display: none;'
        destaque.className = 'destaque abs pulse'
        destaque.style.cssText = ''
        divBtn.remove()
        nextCard()
    }
}

var showInputs = _ => {
    let pop_text = document.querySelector('.balao p');

    user_number.classList.remove('lock')
    user_number.style.cssText = 'display: block;'

    destaque.classList.add('lock')
    destaque.classList.remove('pulse')
    mascara_balao.style.cssText = ''
    user_number.oninput = () => { };

    switch (true) {
        case (t == 7):
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 00000000000.</p>'
            user_number.oninput = () => { onInput(0, 11); };
            break;

        case (t == 9):
            user_number.value = ''
            user_number.style.cssText = 'display: block; top: 26%; left: 51.3%; width: 27rem; padding: 0.5rem; letter-spacing: 3.8rem;'
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 000000.</p>'
            user_number.oninput = () => { onInput(1, 6); };
            break;

        case (t == 11):
            user_number.value = ''
            user_number.style.cssText = 'display: block; top: 20%; padding: 0;'
            pop_text.innerHTML = '<p>Preencha o campo com<br>o número 123456.</p>'
            user_number.oninput = () => { onInput(2, 6); };
            break;
    }
}

function closeBalao(element) {
    destaque.classList.add('pulse')
    element.parentElement.parentElement.style.cssText = 'display: none;'
}

function closeFeedBack(element) {
    element.parentElement.style.cssText = 'display: none;'
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