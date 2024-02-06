function init() {
  // refers
  let destaque = document.querySelector(".destaque.d0");
  let btnArrow = document.querySelector("#btn_arrow");

  // balloon events
  let showAvancar = (e) => {
    gsap.to(destaque, .8, { opacity: 0 });
    gsap.to(btnArrow, .8, { display: "block", opacity: 1 });
  }
  destaque.addEventListener("click", showAvancar);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(destaque, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
}