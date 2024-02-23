var elements = document.querySelectorAll('.content > *');

function init() {
    configModulos()
    // ANIM
    Anim();
}

function configModulos() {
    let btns = document.querySelectorAll('.container_btns')

    //primeira vez
    if (modulos.t_fin.length == 0) {
        btns[0].children[0].onclick = () => {
            screen.goto(modulos.t_ini[0])
        }
        btns[0].children[0].classList.remove('locked')
        return
    }
    //resto
    for (let i = 0; i < modulos.t_fin.length; i++) {
        btns[i].children[1].onclick = () => {
            screen.goto(modulos.t_ini[i])
        }
        btns[i].children[1].classList.remove('locked')
    }
    //se fez todos volta
    if (modulos.t_fin.length == modulos.t_ini.length)
        return
    //libera prox
    let y = (modulos.t_fin.length)
    btns[y].children[0].onclick = () => {
        screen.goto(modulos.t_ini[y])
    }
    btns[y].children[0].classList.remove('locked')
}

function Anim() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.cssText = 'opacity: 0;';
    }

    setTimeout(() => {
        elements[0].style.cssText = '';
        gsap.from($('.title'), .25, { autoAlpha: 0, y: '-40%', onComplete: function () { gsap.set($('.title'), { clearProps: true }); animLastItems(); } });
    }, 200);
}

var animLastItems = _ => {
    for (let i = 1; i < elements.length; i++) {
        elements[i].style.cssText = '';

        gsap.from(elements[i], .4, {
            autoAlpha: 0, x: '-15%', ease: Back.easeOut.config(3.5), delay: (0.2 * i),

            onComplete: function () {
                gsap.set(elements[i], { clearProps: true });
                if (modulos.finish == true) document.querySelector('.container_avancar').style.display = 'block';
            }
        });
    }
}