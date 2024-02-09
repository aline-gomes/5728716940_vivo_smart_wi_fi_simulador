function init() {
  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaque = document.querySelectorAll(".foco");

  // balloon events
  let showDestaque = _ => {
    destaque.forEach((element) => element.style.cssText = 'animation: pulse_radio_button 1.5s infinite;');
  }

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showDestaque();
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    e.target.classList.add('check')
    e.target.style.cssText = 'animation: none; touch-action: none; pointer-events: none;'

    if (document.querySelectorAll('.foco.check').length >= 2) screen.goto(75);
  }

  destaque.forEach((element) => element.addEventListener("click", handleAvancar));

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}