function init() {

  let currDestaque = 0;

  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaques = document.querySelectorAll(".foco");

  // balloon events
  let showDestaque = (dest) => {
    destaques[dest].classList.add('pulse')
  }

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showDestaque(0);
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    if (currDestaque === (destaques.length - 1)) {
      screen.next();
    } else {
      destaques[currDestaque].style.cssText = 'touch-action: none; pointer-events: none;'
      destaques[currDestaque].classList.remove('pulse')

      currDestaque++;
      showDestaque(currDestaque);

      destaques[currDestaque].style.cssText = 'touch-action: unset; pointer-events: unset;'
      destaques[currDestaque].classList.add('pulse')
    }
  }

  destaques.forEach(el => {
    el.addEventListener("click", handleAvancar);
  });

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo(balao, .8, { opacity: 0 }, { opacity: 1 });
}