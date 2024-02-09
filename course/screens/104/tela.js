function init() {
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

    setTimeout(() => {
      destaques[0].classList.remove('pulse')
      destaques[0].style.cssText = 'touch-action: none; pointer-events: none;'

      destaques[1].style.cssText = 'touch-action: unset; pointer-events: unset;'
      showDestaque(1);
    }, 2000);
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    screen.next();
  }
  destaques[1].addEventListener("click", handleAvancar);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}