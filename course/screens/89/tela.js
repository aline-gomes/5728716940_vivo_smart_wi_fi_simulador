function init() {
    // refers
    let destaque = document.querySelector(".destaque.d0");

    // destaque events
    let handleAvancar = (e) => {
      screen.next();
    }
    destaque.addEventListener("click", handleAvancar);
    
    // Animation
    let tl = new gsap.timeline();
    tl.fromTo(destaque, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
}