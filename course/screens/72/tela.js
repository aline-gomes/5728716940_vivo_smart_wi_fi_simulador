function init() {
  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaques = document.querySelectorAll(".foco");

  let inputField = document.querySelector("input.nome");

  let feedNeg = document.querySelector(".feedback");
  let btFecharFeed = document.querySelector(".feedback button.fechar");

  // balloon events
  let showDestaque = (dest) => {
    destaques[dest].classList.add('pulse')
  }

  // close balloon event
  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showDestaque(1);
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    screen.next();
  }
  destaques[1].addEventListener("click", handleAvancar);

  let removePulsar = () => {
    destaques[0].classList.remove('pulse')
  }

  // Animation
  let tl = new gsap.timeline();
  tl.to(destaques[0], .8, { opacity: 1, delay: .5 });
  tl.to(destaques[0], .2, { opacity: 1, onComplete: function () { removePulsar(); } });
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .8, { opacity: 0 }, { opacity: 1 });
}