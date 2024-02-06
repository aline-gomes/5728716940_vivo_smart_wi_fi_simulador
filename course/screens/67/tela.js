var elements = document.querySelectorAll('.content > *');

function init() {
    // ANIM
    Anim();
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
            autoAlpha: 0, x: '-15%', ease: Back.easeOut.config(3.5), delay: (0.2 * i), onComplete: function () {
                gsap.set(elements[i], { clearProps: true });
            }
        });
    }
}