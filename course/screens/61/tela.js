function init() {
    // refers
    let mascara = document.querySelector(".mascara_balao");
    let balao = document.querySelector(".balao.b0");
    let btFecharBalao = document.querySelector(".balao button.fechar");

    let destaques = document.querySelectorAll(".destaque");

    // balloon events
    let showDestaque = (dest) => {
      destaques[dest].style.display = "block";
    }

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
    
    // Animation
    let tl = new gsap.timeline();
    tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: 3 });
    tl.fromTo(destaques[0], .2, { opacity: 1 }, { opacity: 0 });
    tl.fromTo(balao, .8, { opacity: 0 }, { opacity: 1 });
}