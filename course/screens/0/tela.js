function init() { }

var showIntroducao = _ => {
    document.querySelector('.retranca').style.cssText = 'display: none;'
    document.querySelector('#btn_iniciar').style.cssText = 'display: none;'
    document.querySelector('.content').style.cssText = 'background-image: url(./img/bg_portrait.png);'

    gsap.fromTo($('#container_introducao'), .8, { autoAlpha: 0 }, {
        autoAlpha: 1, display: '', onComplete: function () {
            gsap.set($('#container_introducao'), { clearProps: true });
        }
    });
}