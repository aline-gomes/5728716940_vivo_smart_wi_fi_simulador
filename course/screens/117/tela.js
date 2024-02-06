var elements = document.querySelectorAll('.anim');

function init() {
    Anim();
}

function Anim() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.cssText = 'opacity: 0;';

        setTimeout(() => {
            elements[i].style.cssText = '';

            gsap.from(elements[i], .3, {
                autoAlpha: 0, y: '-40%', ease: Back.easeOut.config(3.5), delay: (0.2 * i),
                onComplete: function () { gsap.set(elements[i], { clearProps: true }); }
            });
        }, 200);
    }
}