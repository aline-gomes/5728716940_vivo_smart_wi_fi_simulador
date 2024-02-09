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

  showDestaque(0);

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";
    destaques[1].style.cursor = 'pointer'

    showDestaque(1);
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    screen.next();
  }
  destaques[1].addEventListener("click", handleAvancar);

  // Animation
  let tl = new gsap.timeline({ onComplete: function () { destaques[0].classList.remove('pulse'); } });

  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: 3 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}