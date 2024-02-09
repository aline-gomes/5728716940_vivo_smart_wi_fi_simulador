function init() {

  // refers
  let mainContent = document.querySelector(".content");

  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let btAvancar = document.querySelector("#btn_arrow");

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    gsap.to(btAvancar, .8, { autoAlpha: 1 });
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: 3 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}