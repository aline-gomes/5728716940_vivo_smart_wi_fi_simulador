function init() {
  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaque = document.querySelector(".destaque.d0");

  // balloon events
  let showDestaque = _ => {
    destaque.style.display = "block";
  }

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showDestaque();
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // destaque events
  let handleAvancar = (e) => {
    screen.next();
  }
  destaque.addEventListener("click", handleAvancar);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo(balao, .8, { opacity: 0 }, { opacity: 1 });
}