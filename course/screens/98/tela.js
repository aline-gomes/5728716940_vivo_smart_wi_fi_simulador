function init() {
  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaque = document.querySelectorAll(".foco");
  let coverCheckBox = document.querySelector(".coverCheckBox");

  // balloon events
  let showDestaque = (dest) => {
    destaque[dest].classList.add('pulse')
  }

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showDestaque(0);
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    destaque[0].style.cssText = 'touch-action: none; pointer-events: none;'
    destaque[0].classList.remove('pulse')

    destaque[1].style.cssText = 'touch-action: unset; pointer-events: unset;'
    destaque[1].classList.add('pulse')

    destaque[1].onclick = _ => { screen.next(); };
  }
  destaque[0].addEventListener("click", handleAvancar);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}