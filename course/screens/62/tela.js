function init() {
  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaque = document.querySelector(".destaque.d0");
  let btnArrow = document.querySelector("#btn_arrow");

  // balloon events
  let showAvancar = _ => {
    gsap.to(destaque, .8, { opacity: 0 });
    gsap.to(btnArrow, .8, { display: "block", opacity: 1 });
  }

  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    showAvancar();
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(destaque, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}