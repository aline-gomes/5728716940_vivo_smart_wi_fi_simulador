function init() {
    // refers
    let mascara = document.querySelector(".mascara_balao");

    let destaque = document.querySelector(".destaque.d0");

    // destaque events
    let handleAvancar = (e) => {
      screen.next();
    }
    destaque.addEventListener("click", handleAvancar);
    
    // Animation
    let tl = new gsap.timeline();
    tl.fromTo(destaque, .8, { opacity: 0, display: "none" }, { opacity: 1, display: "block", delay: .5 });
}